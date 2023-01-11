import { FetchMails } from "./components/FetchMails";
import { Home } from "./components/Home";
import SendEmail from "./components/SendEmail";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/fetch-mails',
    element: <FetchMails />
  },
  {
    path: '/send-mail',
    element: <SendEmail />
  }
];

export default AppRoutes;
