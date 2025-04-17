"use client"

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { GripVertical, Plus, Trash2 } from "lucide-react"
import type { DropResult, DroppableProvided } from "react-beautiful-dnd"
import type { CoverLetterSection } from "./CoverLetterEditor"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface CoverLetterSectionManagerPanelProps {
  sections: CoverLetterSection[]
  onSectionReorder: (reorderedSections: CoverLetterSection[]) => void
  onDeleteSection: (sectionId: string) => void
  onAddSectionClick: () => void
}

export function CoverLetterSectionManagerPanel({
  sections,
  onSectionReorder,
  onDeleteSection,
  onAddSectionClick,
}: CoverLetterSectionManagerPanelProps) {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(sections)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    onSectionReorder(items)
  }

  return (
    <Card className="bg-white rounded-lg shadow-sm border border-gray-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-900">항목 관리</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="sections">
              {(provided: DroppableProvided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                  {sections.map((section, index) => (
                    <Draggable
                      key={section.id}
                      draggableId={section.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200"
                        >
                          <div className="flex items-center space-x-3 overflow-hidden">
                            <div {...provided.dragHandleProps} className="text-gray-400 cursor-grab">
                              <GripVertical size={18} />
                            </div>
                            <span className="text-sm font-medium text-gray-700 truncate">
                              {section.sectionTitle}
                            </span>
                          </div>
                          <Button
                            type="button"
                            onClick={() => onDeleteSection(section.id)}
                            variant="ghost"
                            size="sm"
                            className="text-gray-500 hover:text-red-500"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <Button
            type="button"
            onClick={onAddSectionClick}
            variant="outline"
            className="w-full flex items-center justify-center space-x-1 mt-4"
          >
            <Plus size={16} />
            <span>항목 추가하기</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
