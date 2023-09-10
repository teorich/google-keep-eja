/* eslint-disable react/jsx-props-no-spreading */

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import { makeStyles } from 'tss-react/mui';
import { Box, Grid, useTheme } from '@mui/material';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import { useState } from 'react';
import CreateTodo from '../todoSection/CreateTodo';
import TodoItem from '../todoSection/TodoItem';
import { useTodosStore } from '../../context/globalStore';
import { TodoActionKind } from '../../interfaces/todo';
import EditTodo from '../todo/EditTodo';

const useStyles = makeStyles()((theme) => ({
  todoCreateWrapper: {
    flex: 1,
    maxWidth: theme.spacing(75),
    margin: '0 auto',
  },
}));

const reorder = (
  list: Iterable<unknown> | ArrayLike<unknown>,
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function Notes() {
  const { classes } = useStyles();

  const theme = useTheme();

  const [openEditModal, setOpenEditModal] = useState(false);

  const [state, dispatch, selectedTodo, setSelectedTodo] = useTodosStore();

  const handleClickOpen = (item) => {
    setSelectedTodo(item);
    setOpenEditModal(true);
  };

  const handleClose = (value?: string) => {
    setSelectedTodo(null);
    setOpenEditModal(false);
  };

  const onDragEnd = (result: DropResult) => {
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

        {state.todos.length > 0 ? (
          <DragDropContext onDragEnd={onDragEnd} key={selectedTodo}>
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
                                handleClickOpen(noteItem);
                              }}
                              noteItem={noteItem}
                              // isEditMode={selectedTodo?.id === noteItem.id}
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
        ) : (
          <Grid
            container
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
              }}
            >
              <LightbulbOutlinedIcon
                style={{
                  fontSize: 100,
                  color: theme.palette.grey[300],
                  marginLeft: 30,
                }}
              />
            </div>
            <span>Notes you add appear here</span>
          </Grid>
        )}
      </Box>
      <EditTodo
        key={selectedTodo}
        noteItem={selectedTodo}
        open={openEditModal}
        onClose={handleClose}
      />
    </Box>
  );
}
