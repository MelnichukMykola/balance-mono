import { QuestionCircleOutlined } from "@ant-design/icons";
import React from "react";

export const monobankHelpItems = [
  {
    label: "Де знайти токен монобанка?",
    key: "SubMenu",
    icon: <QuestionCircleOutlined />,
    children: [
      {
        type: "group",
        label: (
          <span>
            {" "}
            Щоб отримати токен монобанка, Вам потрібно перейти
            <a
              className="link"
              href="https://api.monobank.ua/index.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              за цим посиланням
            </a>{" "}
            і натиснути на QR-код aбо його відсканувати. Вас перекине в mono,
            вам потрібно погодитись і зайти знову на сайт, натиснути червону
            кнопку активувати і скопіювати Ваш токен-моно і вставити в поле
            зверху.
            <br />
            <span className="warning">
              P.S. Не переживайте. Ваші дані в безпеці
            </span>
          </span>
        ),
      },
    ],
  },
];
