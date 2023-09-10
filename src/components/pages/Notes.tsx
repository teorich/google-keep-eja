/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { makeStyles } from 'tss-react/mui';
import { Box, Grid } from '@mui/material';
import { useState } from 'react';
import CreateTodo from '../todoSection/CreateTodo';
import TodoItem from '../todoSection/TodoItem';
import { useUiStore, useTodosStore } from '../../context/globalStore';
import { TodoActionKind } from '../../interfaces/todo';
import EditTodo from '../todo/EditTodo';

const useStyles = makeStyles()((theme) => ({
  todoCreateWrapper: {
    flex: 1,
    maxWidth: theme.spacing(75),
    margin: '0 auto',
  },
}));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function Notes() {
  const { classes } = useStyles();

  const [openEditModal, setOpenEditModal] = useState(false);

  const handleClickOpen = () => {
    setOpenEditModal(true);
  };

  const handleClose = (value?: string) => {
    setOpenEditModal(false);
  };

  const [{ noteInEditMode }] = useUiStore();
  const [state, dispatch] = useTodosStore();

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = reorder(
      state.todos,
      result.source.index,
      result.destination.index
    );
    dispatch({
      type: TodoActionKind.RESHUFFLE,
      payload: items,
    });
  };

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Box sx={{ p: 3, width: '100%' }}>
        <div className={classes.todoCreateWrapper}>
          <CreateTodo />
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <Grid
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  marginTop: 10,
                }}
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {state.todos.map((noteItem, index) => {
                  return (
                    <Draggable
                      key={noteItem.id}
                      draggableId={noteItem.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <Grid
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          item
                          xs={2}
                          sm={4}
                          md={3}
                        >
                          <TodoItem
                            onMouseUpCapture={(evt) => {
                              handleClickOpen();
                            }}
                            noteItem={noteItem}
                            isEditMode={noteInEditMode === noteItem.id}
                          />
                          <EditTodo
                            noteItem={noteItem}
                            open={openEditModal}
                            onClose={handleClose}
                          />
                        </Grid>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </Grid>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
    </Box>
  );
}
