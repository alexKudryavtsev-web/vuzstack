import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { getDirections } from '../../store/selectors';
import DirectionItem from './DirectionItem';

function DirectionsList() {
  const [directions, setDirections] = useState(useSelector(getDirections));

  function onDragEnd(result) {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;
    const projects = reorder(
      directions,
      result.source.index,
      result.destination.index,
    );

    setDirections(projects);
  }

  function onDragStart() {}

  function reorder(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }

  if (!directions.length) {
    return (
      <div className="mt-4">
        <span>Надо выбрать хотя-бы 2 направления</span>
      </div>
    );
  }

  return (
    <section className="flex my-2 flex-col justify-center antialiased p-2">
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <Droppable droppableId="list">
          {(provided) => (
            <div
              className="divide-y"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {directions.map((item, index) => (
                <Draggable
                  draggableId={String(item.id)}
                  key={item.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <DirectionItem direction={item} />
                      {provided.placeholder}
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
}

export default DirectionsList;
