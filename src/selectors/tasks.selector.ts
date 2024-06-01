export const tasksSelector = (state) => state.general.tasks;
export const tasksStatusSelector = (state) => state.general.tasksStatus;
export const taskByIdSelector = (id: number, state) =>
  state.general?.tasks?.find((task: Task) => task.id === id);

export const taskOnEditSelector = (state) => {
  if (state.general.taskOnEdit > -1) {
    return state.general.tasks.find(
      (task) => task.id === state.general.taskOnEdit
    );
  }
  return null;
};

export const isFilterSearchOnSelector = (state) => {
  return state.general.isFilterSearchOn;
};

export const filterSearchTextSelector = (state) =>
  state.general.filterSearchText;

export const filteredSearchResultsSelector = (state) => {
  const filterSearchText = filterSearchTextSelector(state);
  const tasks = tasksSelector(state);

  if (filterSearchText) {
    return tasks.filter(
      (task: Task) =>
        task.title.includes(filterSearchText) ||
        task.description?.includes(filterSearchText)
    );
  }
  return null;
};
