"use client";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import type { DropResult, DroppableProvided } from "@hello-pangea/dnd";
import type { CoverLetterSection } from "./CoverLetterEditor";

interface Props {
  sections: CoverLetterSection[];
  onSectionReorder: (sections: CoverLetterSection[]) => void;
  onDeleteSection: (id: string) => void;
  onAddSectionClick: () => void;
}

export function CoverLetterSectionManagerPanel({ sections, onSectionReorder, onDeleteSection, onAddSectionClick }: Props) {
  // DnD 핸들러 예시
  function handleDragEnd(result: DropResult) {
    if (!result.destination) return;
    const newSections = Array.from(sections);
    const [removed] = newSections.splice(result.source.index, 1);
    newSections.splice(result.destination.index, 0, removed);
    onSectionReorder(newSections);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold">항목 관리</span>
        <button type="button" onClick={onAddSectionClick} className="p-1 rounded hover:bg-gray-100">
          <Plus size={18} />
        </button>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="cover-letter-section-list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {sections.map((section, idx) => (
                <Draggable key={section.id} draggableId={section.id} index={idx}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="flex items-center justify-between px-3 py-2 bg-white border rounded mb-2 shadow-sm"
                    >
                      <div className="flex items-center gap-2">
                        <span {...provided.dragHandleProps} className="cursor-move text-gray-400">
                          <GripVertical size={16} />
                        </span>
                        <span className="font-medium text-sm">{section.sectionTitle}</span>
                      </div>
                      <button type="button" onClick={() => onDeleteSection(section.id)} className="text-gray-400 hover:text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
