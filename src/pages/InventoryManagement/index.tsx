import { Alert, Button, Form, Input, Modal } from "antd";
import { Pencil, Plus, Trash } from "lucide-react";
import * as React from "react";
import { useSearchParams } from "react-router";
import CommonPagination from "../../components/common/common-pagination";
import SideBar from "../../components/common/sidebar";
import WrapperTable from "../../components/wrapper-table";
import useAlert from "../../hooks/useAlert";
import useIngredientsModal from "../../hooks/useIngredientsModal";
import usePagination from "../../hooks/usePagination";
import useSearch from "../../hooks/useSearch";
import { formatRupiah } from "../../utils";
import {
  deleteIngredients,
  getListOfIngredients,
} from "../../services/localStorage";
import CustomDeleteModal from "../../components/common/common-modal-delete";

interface IInventoryManagementProps {}

const InventoryManagement: React.FunctionComponent<
  IInventoryManagementProps
> = () => {
  const {
    form,
    handleCancel,
    handleOk,
    handleSubmit,
    isEditMode,
    isModalOpen,
    showModal,
  } = useIngredientsModal();
  const { handleSearch, search } = useSearch("");
  const [searchParams] = useSearchParams();
  const getSearchQueryPage = searchParams.get("page") ?? 1;
  const limit = 10;
  const [dataIngredients, setDataIngredients] = React.useState([]);
  const { handlePagination, page } = usePagination({
    initialLimit: limit,
    initialPage: +getSearchQueryPage,
  });

  React.useEffect(() => {
    setDataIngredients(getListOfIngredients());
  }, [isModalOpen]);

  const [isDeleteModalVisible, setIsDeleteModalVisible] = React.useState(false);
  const [deleteItemId, setDeleteItemId] = React.useState<number | null>(null);

  const handleDelete = (id: number) => {
    setDeleteItemId(id);
    setIsDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    if (deleteItemId !== null) {
      deleteIngredients(deleteItemId);
      setDataIngredients(getListOfIngredients());
      addAlert("Successfully Delete Ingredients", "success");
    }
    setIsDeleteModalVisible(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
  };

  const columns = [
    { title: "Id", dataIndex: "nomor", key: "nomor", align: "center" },
    { title: "Item", dataIndex: "name", key: "name", align: "center" },
    { title: "Qty", dataIndex: "qty", key: "qty", align: "center" },
    { title: "Uom", dataIndex: "uom", key: "uom", align: "center" },
    {
      title: "Price per qty",
      dataIndex: "total_price",
      key: "total_price",
      align: "center",
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (text: any, record: any) => {
        return (
          <div className="flex gap-x-5 justify-center">
            <Button
              onClick={() => showModal(record?.key)}
              className="bg-[#FF9357]! hover:text-white! border-0"
              size="large"
            >
              <Pencil className="w-4 h-4" /> Edit
            </Button>
            <Button
              onClick={() => handleDelete(record?.key)}
              className="bg-[#E0004E]/70! hover:text-white! border-0"
              size="large"
            >
              <Trash className="w-4 h-4" />
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  const coffeeLists = React.useMemo(() => {
    return dataIngredients
      .filter((coffee: any) =>
        coffee?.name.toLowerCase().includes(search.toLowerCase())
      )
      .slice((page - 1) * limit, page * limit)
      .map((coffee: any, index: number) => ({
        key: coffee.id,
        nomor: (page - 1) * limit + index + 1,
        name: coffee.name,
        qty: coffee.qty,
        uom: coffee?.uom?.toUpperCase(),
        total_price: formatRupiah(+coffee.total_price),
      }));
  }, [dataIngredients, search, page, limit]);

  const { alerts, addAlert, removeAlert } = useAlert();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <>
      <SideBar isOpenSide={isOpen} setIsOpenSide={setIsOpen} />
      <CustomDeleteModal
        title="Delete Ingredients Coffee"
        content="Are you sure you want to delete Ingredients?"
        isVisible={isDeleteModalVisible}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
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
            <div className="text-[32px] font-semibold text-dark">
              Inventory Management
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="shrink md:w-[516px] w-full">
              <Input.Search
                defaultValue={search}
                onSearch={handleSearch}
                // onSearch={handleSearch}
                allowClear
                placeholder="Search Item"
                className="input-field !outline-none !border-none italic form-icon-search ring-indigo-200
                        focus:ring-2 transition-all duration-300 w-full"
              />
            </div>
          </div>
        </section>

        <section className="pt-[50px]">
          <div className="mb-[30px]">
            <div className="flex items-center justify-between gap-6">
              <div>
                <div className="text-xl font-medium text-dark">Ingredients</div>
                <p className="text-grey">Manage Ingredients</p>
              </div>

              <div>
                <Button
                  onClick={() => showModal()}
                  className="bg-[#006CE5]/70! hover:text-white! border-0"
                  size="large"
                  //   loading={isPending}
                >
                  <Plus className="w-4 h-4" /> Create
                </Button>

                <Modal
                  title={isEditMode ? "Edit Ingredient" : "Create Ingredient"}
                  centered
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    className="card w-full"
                  >
                    <Form.Item
                      label="Item Name"
                      name="name"
                      rules={[
                        { required: true, message: "name must be filled" },
                      ]}
                      className="form-group"
                    >
                      <Input
                        placeholder="Enter item name"
                        size="large"
                        className="input-field"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Quantity"
                      name="qty"
                      rules={[
                        { required: true, message: "quantity must be filled" },
                      ]}
                      className="form-group"
                    >
                      <Input
                        size="large"
                        className="input-field"
                        type="number"
                        placeholder="Enter quantity"
                      />
                    </Form.Item>
                    <Form.Item
                      label="UoM"
                      name="uom"
                      rules={[
                        {
                          required: true,
                          message: "unit of measurement must be filled",
                        },
                      ]}
                      className="form-group"
                    >
                      <Input
                        size="large"
                        className="input-field"
                        placeholder="Enter unit of measurement"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Price per Quantity"
                      name="total_price"
                      rules={[
                        { required: true, message: "price must be filled" },
                      ]}
                      className="form-group"
                    >
                      <Input
                        size="large"
                        className="input-field"
                        type="number"
                        placeholder="Enter price per quantity"
                      />
                    </Form.Item>

                    <Form.Item>
                      <Button
                        className="btn btn-primary mt-[10px] w-full py-6! rounded-xl!"
                        htmlType="submit"
                        type="primary"
                        size="large"
                        //   loading={isPending}
                      >
                        {isEditMode ? "Edit Ingredient" : "Create Ingredient"}
                      </Button>
                    </Form.Item>
                  </Form>
                </Modal>
              </div>
            </div>
          </div>
          <div className="mb-5 items-center w-full">
            {alerts.map((alert) => (
              <Alert
                key={alert.id}
                message={alert.message}
                type={alert.type}
                closable
                onClose={() => removeAlert(alert.id)}
              />
            ))}
          </div>

          <WrapperTable
            tableConfig={{ columns: columns, rowKey: "key" }}
            tableData={coffeeLists}
            loading={!coffeeLists}
            isShowPagination={true}
            pagination={
              <CommonPagination
                current={page}
                pageSize={limit}
                total={dataIngredients.length}
                onChange={(page: number, pageSize: number) =>
                  handlePagination(page, pageSize)
                }
              />
            }
          />
        </section>
      </div>
    </>
  );
};

export default InventoryManagement;
