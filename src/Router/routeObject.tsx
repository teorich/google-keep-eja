/* eslint-disable @typescript-eslint/naming-convention */
import { RouteObject } from 'react-router-dom';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Notes from '../components/pages/Notes';
import PlaceHolder from '../components/pages/PlaceHolder';

export type iRoute = RouteObject & {
  name: string;
  label?: string;
  icon?: unknown;
};

export const ArrayRoutes: Array<iRoute> = [
  {
    name: 'notes',
    label: 'notes',
    path: '/notes',
    icon: <LightbulbOutlinedIcon />,
    element: <Notes />,
    children: [],
  },
  {
    name: 'reminders',
    label: 'reminders',
    path: '/reminders',
    icon: <NotificationsNoneOutlinedIcon />,
    element: <Notes />,
    children: [],
  },
  {
    name: 'edit-labels',
    label: 'edit-labels',
    path: '/edit-labels',
    icon: <EditOutlinedIcon />,
    element: <PlaceHolder content="Edit Labels" />,
    children: [],
  },
  {
    name: 'archive',
    label: 'archive',
    path: '/archive',
    icon: <ArchiveOutlinedIcon />,
    element: <PlaceHolder content="Archive" />,
    children: [],
  },
  {
    name: 'trash',
    label: 'trash',
    path: '/trash',
    icon: <DeleteOutlineOutlinedIcon />,
    element: <PlaceHolder content="Trash" />,
    children: [],
  },
];
