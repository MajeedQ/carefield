import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import type { ReactNode } from "react";

export function SortableList<T extends { id: string }>({
  items,
  onReorder,
  renderItem,
}: {
  items: T[];
  onReorder: (next: T[]) => void;
  renderItem: (item: T) => ReactNode;
}) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIdx = items.findIndex((i) => i.id === active.id);
    const newIdx = items.findIndex((i) => i.id === over.id);
    if (oldIdx < 0 || newIdx < 0) return;
    onReorder(arrayMove(items, oldIdx, newIdx));
  };
  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {items.map((item) => (
            <SortableRow key={item.id} id={item.id}>
              {renderItem(item)}
            </SortableRow>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

function SortableRow({ id, children }: { id: string; children: ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 }}
      className="flex items-stretch gap-2 bg-white border border-slate-200 rounded-xl p-3 shadow-sm"
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="px-2 cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-700 flex items-center"
        aria-label="اسحب لإعادة الترتيب"
      >
        <GripVertical className="w-5 h-5" />
      </button>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

export function FileDropzone({
  accept,
  onFile,
  hint,
}: {
  accept: string;
  onFile: (file: File) => void;
  hint: string;
}) {
  return (
    <label
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const f = e.dataTransfer.files?.[0];
        if (f) onFile(f);
      }}
      className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-blue-200 rounded-xl py-8 px-4 cursor-pointer bg-blue-50/30 hover:bg-blue-50 transition text-center"
    >
      <span className="text-sm font-bold text-[#002c6d]">اسحب الملف هنا أو اضغط للاختيار</span>
      <span className="text-xs text-slate-500">{hint}</span>
      <input
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
        }}
      />
    </label>
  );
}
