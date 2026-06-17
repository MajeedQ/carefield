-- Backfill: grant admin role to every existing auth user that doesn't already have one
INSERT INTO public.user_roles (user_id, role)
SELECT u.id, 'admin'::app_role
FROM auth.users u
WHERE NOT EXISTS (
  SELECT 1 FROM public.user_roles r WHERE r.user_id = u.id
)
ON CONFLICT DO NOTHING;

-- Replace the "first admin only" function with one that grants admin to every new signup,
-- since this app is admin-only and accounts are created manually by the owner.
CREATE OR REPLACE FUNCTION public.assign_first_admin()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  INSERT INTO public.user_roles(user_id, role)
  VALUES (NEW.id, 'admin'::app_role)
  ON CONFLICT DO NOTHING;
  RETURN NEW;
END;
$function$;

-- Attach the trigger to auth.users so every new account becomes an admin automatically
DROP TRIGGER IF EXISTS on_auth_user_created_assign_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_assign_admin
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.assign_first_admin();