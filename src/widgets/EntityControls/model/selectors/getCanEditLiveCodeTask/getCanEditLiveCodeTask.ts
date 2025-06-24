import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import { getLiveCodeTask } from '@/entities/LiveCode';

export const getCanEditLiveCodeTask = (taskId: string) =>
    createSelector(
        [
            (state) => getLiveCodeTask.select(taskId)(state)?.data,
            getUserAuthData,
        ],
        (task, user) => {
            if (!task || !user) {
                return false;
            }
            return task.user.id === user.id;
        },
    );
