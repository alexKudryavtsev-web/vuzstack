import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { store } from '../../store';
import { updatePriority } from '../../store/reducers/userReducer';
import { getDirections } from '../../store/selectors';
import DirectionItem from './SelectedDirection';

function Selected() {
  const directions = useSelector(getDirections);

  function onDragEnd(result) {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;

    store.dispatch(
      updatePriority({
        directionId: directions[result.source.index].id,
        priority: result.destination.index + 1,
      }),
    );
  }

  function onDragStart() {}

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
                      <DirectionItem direction={item} index={index} />
                    </div>
                  )}
                </Draggable>
              ))}
              <span style={{ display: 'none' }}>{provided.placeholder}</span>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
}

export default Selected;
