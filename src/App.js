// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import {RoleContextProvider, ShowAppDialogContextProvider} from "./components/contexts/RoleContextProvider";
import "./app.css"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


// ----------------------------------------------------------------------

export default function App() {
  return (
    <ShowAppDialogContextProvider>
      <RoleContextProvider>
        <ThemeConfig>
          <ScrollToTop />
          <GlobalStyles />
          <BaseOptionChartStyle />
          <Router />
        </ThemeConfig>
      </RoleContextProvider>
      </ShowAppDialogContextProvider>
    );
}
