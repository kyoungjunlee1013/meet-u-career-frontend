"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { GripVertical, Plus, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ResumeSection } from "./ResumeEditor"

interface ResumeSectionManagerPanelProps {
  sections: ResumeSection[]
  onSectionToggle: (sectionId: string) => void
  onSectionReorder: (reorderedSections: ResumeSection[]) => void
  onAddSectionClick: () => void
}

export function ResumeSectionManagerPanel({
  sections,
  onSectionToggle,
  onSectionReorder,
  onAddSectionClick,
}: ResumeSectionManagerPanelProps) {
  const [isInactiveExpanded, setIsInactiveExpanded] = useState(true)

  const activeSectionsCount = sections.filter((section) => section.isActive).length;

  const handleDragEnd = (result: any) => {
  if (!result.destination) return;
  if (result.source.droppableId !== "active-sections" || result.destination.droppableId !== "active-sections") return;

  // 활성 항목만 추출하여 순서 변경
  const newActiveSections = Array.from(activeSections);
  const [removed] = newActiveSections.splice(result.source.index, 1);
  newActiveSections.splice(result.destination.index, 0, removed);

  // 전체 sections 배열에서 활성 항목의 순서만 newActiveSections 순서로 재배치
  const newSections = [];
  let activeIdx = 0;
  for (const section of sections) {
    if (section.isActive) {
      newSections.push(newActiveSections[activeIdx]);
      activeIdx++;
    } else {
      newSections.push(section);
    }
  }
  onSectionReorder(newSections);
}

  const activeSections = sections.filter(s => s.isActive);
const inactiveSections = sections.filter(s => !s.isActive);
return (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    <div className="p-4 border-b border-gray-200">
      <h3 className="text-lg font-medium text-gray-900">항목 관리</h3>
    </div>

    <div className="p-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">활성 항목</h4>
          <Droppable droppableId="active-sections" isDropDisabled={false} isCombineEnabled={false} ignoreContainerClipping={false}>
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                {activeSections.map((section, index) => (
                  <Draggable key={String(section.id)} draggableId={String(section.id)} index={index}>
                    {(providedDraggable, snapshot) => (
                      <li
                        ref={providedDraggable.innerRef}
                        {...providedDraggable.draggableProps}
                        className={`flex items-center justify-between p-3 rounded-md border ${
                          snapshot.isDragging
                            ? "border-blue-300 bg-blue-50 shadow-md"
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        <div className="flex items-center">
                          <div {...providedDraggable.dragHandleProps} className="mr-2 cursor-grab">
                            <GripVertical className="h-4 w-4 text-gray-400" />
                          </div>
                          <span>{section.title}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onSectionToggle(section.id)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
          </div>

          <div>
            <div
              className="flex items-center justify-between mb-2 cursor-pointer"
              onClick={() => setIsInactiveExpanded(!isInactiveExpanded)}
            >
              <h4 className="text-sm font-medium text-gray-700">비활성 항목</h4>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                {isInactiveExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>

            {isInactiveExpanded && (
              <Droppable droppableId="inactive-sections" ignoreContainerClipping={false} isDropDisabled={false} isCombineEnabled={false}>
                {(provided) => (
                  <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                    {inactiveSections.map((section, index) => (
  <Draggable key={String(section.id)} draggableId={String(section.id)} index={index}>
    {(providedDraggable, snapshot) => (
      <li
        ref={providedDraggable.innerRef}
        {...providedDraggable.draggableProps}
        className={`flex items-center justify-between p-3 rounded-md border ${
          snapshot.isDragging
            ? "border-blue-300 bg-blue-50 shadow-md"
            : "border-gray-200 bg-gray-50"
        } opacity-70`}
      >
        <div className="flex items-center">
          <div {...providedDraggable.dragHandleProps} className="mr-2 cursor-grab">
            <GripVertical className="h-4 w-4 text-gray-400" />
          </div>
          <span className="text-gray-600">{section.title}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onSectionToggle(section.id)}
          className="text-gray-500 hover:text-gray-700"
        >
          <ChevronUp className="h-4 w-4" />
        </Button>
      </li>
    )}
  </Draggable>
))}
{provided.placeholder}
                  </ul>
                )}
              </Droppable>
            )}
          </div>
        </DragDropContext>

        <Button
          type="button"
          variant="outline"
          className="w-full mt-4 flex items-center justify-center"
          onClick={onAddSectionClick}
        >
          <Plus className="h-4 w-4 mr-2" />새 항목 추가
        </Button>
      </div>
    </div>
  )
}
