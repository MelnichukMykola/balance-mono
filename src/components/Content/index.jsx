import { QuestionCircleOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import "./styles.scss";

const items = [
  {
    label: "Про що цей сайт?",
    key: "SubMenu",
    icon: <QuestionCircleOutlined style={{ color: "red" }} />,
    children: [
      {
        type: "group",
        label: (
          <span className="content__info_text">
            Сайт дозволяє вам переглянути свою виписку в зручному вигляді
            транзакцій і графіків. Спочатку ви бачите тестові дані, щоб ви
            зрозуміли як це взагалі працює, але... але, щоб побачити свої дані
            вам потрібно зареєструватися або увійти.
            <br />
          </span>
        ),
      },
    ],
  },
];

const Content = ({
  transactions,
  data,
  dataForPie,
  dataArea,
  options,
  columns,
  transOnFullDisplay,
  chartsOnFullDisplay,
  Table,
  Pie,
  Line,
  largePageSize,
  smallPageSize,
  isUserLogged,
}) => {
  return (
    <>
      {transOnFullDisplay && (
        <div className="table-container">
          <Table
            columns={columns}
            pagination={{
              pageSize: largePageSize,
              position: ["topMiddle"],
              showSizeChanger: false,
            }}
            size="small"
            dataSource={transactions}
            scroll={{ x: "max-content" }}
          />
        </div>
      )}
      {chartsOnFullDisplay && (
        <div className="charts">
          <div className="charts__line">
            <Line data={data} options={options} />
          </div>
          <div className="charts__mixed">
            <div className="charts__mixed_line">
              <Line data={dataArea} options={options} />
            </div>
            <div className="charts__mixed_pie">
              <Pie data={dataForPie} />
            </div>
          </div>
        </div>
      )}
      {!transOnFullDisplay && !chartsOnFullDisplay && (
        <div className="content">
          {!isUserLogged && (
            <Menu mode="inline" items={items} className="content__info" />
          )}
          <div className="content__chart">
            <Line data={data} options={options} />
          </div>
          <div className="content__table">
            <Table
              columns={columns}
              pagination={{
                pageSize: smallPageSize,
                position: ["topMiddle"],
                showSizeChanger: false,
              }}
              size="small"
              dataSource={transactions}
              scroll={{ x: "max-content" }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Content;
