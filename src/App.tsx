/* eslint-disable import/no-extraneous-dependencies */
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { light } from './theme';
import { UiProvider, UserProvider, TodosProvider } from './context/globalStore';
import CustomDrawer from './components/NavigationDrawer/CustomDrawer';

export default function App() {
  return (
    <UserProvider>
      <UiProvider>
        <ThemeProvider theme={light}>
          <CssBaseline />
          <TodosProvider>
            <CustomDrawer />
          </TodosProvider>
        </ThemeProvider>
      </UiProvider>
    </UserProvider>
  );
}
