import { Button, Form, Input } from "antd";
import * as React from "react";
import SideBar from "../../components/common/sidebar";
import WrapperTable from "../../components/wrapper-table";
import useRecipe from "../../hooks/useRecipe";
import { formatRupiah } from "../../utils";

interface IRecipeProps {}

const Recipe: React.FunctionComponent<IRecipeProps> = () => {
  const { handleSubmit, ingredientLists, totalCOGS } = useRecipe();

  const [form] = Form.useForm();

  const columns = [
    {
      title: "Ingredient",
      dataIndex: "ingredient",
      key: "ingredient",
      align: "center",
    },
    { title: "Amount", dataIndex: "amounte", key: "amounte", align: "center" },
    {
      title: "Total Cost",
      dataIndex: "total_cost",
      key: "total_cost",
      align: "center",
    },
  ];

  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <>
      <SideBar isOpenSide={isOpen} setIsOpenSide={setIsOpen} />
      <div className="lg:pr-[70px] py-[50px] lg:ml-[320px] xl:ml-[365px] px-4 lg:pl-0">
        <section className="flex flex-col flex-wrap justify-between gap-6 md:items-center md:flex-row">
          <div className="flex items-center justify-between gap-4">
            <div
              id="toggleOpenSidebar"
              className="lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                className="w-6 h-6 text-dark"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                ></path>
              </svg>
            </div>
            <div className="text-[32px] font-semibold text-dark">Receipe</div>
          </div>
        </section>

        <section className="pt-[50px]">
          <div className="mb-[30px]">
            <div className="flex items-center justify-between gap-6">
              <div>
                <div className="text-xl font-medium text-dark">Receipe</div>
                <p className="text-grey">Manage Receipe</p>
              </div>
            </div>
          </div>
          <div className="mb-10">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              className="card w-full"
            >
              <Form.Item
                label="Enter the number of cups"
                name="cups"
                rules={[
                  {
                    required: true,
                    message: "Please enter the number of cups!",
                  },
                ]}
              >
                <Input type="number" min={1} size="large" />
              </Form.Item>
              <Form.Item>
                <Button
                  className="btn btn-primary mt-[10px] w-full py-6! rounded-xl!"
                  htmlType="submit"
                  type="primary"
                  size="large"
                >
                  Calculate COGS
                </Button>
              </Form.Item>
            </Form>
          </div>
          <WrapperTable
            tableConfig={{ columns: columns, rowKey: "key" }}
            tableData={ingredientLists}
            loading={!ingredientLists}
          />

          <div className="text-lg font-bold mt-4">
            Total COGS:{" "}
            <span className="text-blue-600">{formatRupiah(totalCOGS)}</span>
          </div>
        </section>
      </div>
    </>
  );
};

export default Recipe;
