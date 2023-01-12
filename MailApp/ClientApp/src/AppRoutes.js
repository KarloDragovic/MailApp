import { FetchMails } from "./components/FetchMails";
import SendEmail from "./components/SendEmail";

const AppRoutes = [
  {
    path: '/fetch-mails',
    element: <FetchMails />
  },
  {
    index: true,
    element: <SendEmail />
  }
];

export default AppRoutes;
