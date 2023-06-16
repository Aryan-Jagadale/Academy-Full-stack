import React, { useEffect } from "react";
import { RiDeleteBin7Fill, RiExchangeBoxFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers, updateUserRole } from "../../../redux/actions/admin";
import { toast } from "react-hot-toast";

const Users = () => {
  const { users, error, message } = useSelector(state => state.admin);

  const dispatch = useDispatch();


  const updateHandler = (userId) => {
    //console.log("Update",userId);
    dispatch(updateUserRole(userId))
  };
  const deleteButtonHandler = (userId) => {
    //console.log("Delete",userId);
    dispatch(deleteUser(userId))

  };


  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }

    dispatch(getAllUsers());
  }, [dispatch, error, message]);

  return (
    <div>
      <h2 className="text-center text-xl">All users</h2>

      <section className="p-10">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        id
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Role
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Subscription
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Actions
                      </th>

                     
                    </tr>
                  </thead>
                  <tbody>
                    {users &&
                      users.map((item) => (
                        <Row
                          updateHandler={updateHandler}
                          deleteButtonHandler={deleteButtonHandler}
                          key={item._id}
                          item={item}
                        />
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Users;

function Row({ item, updateHandler, deleteButtonHandler, loading }) {
  return (
    <tr className="border-b">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {item._id}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {item.name}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {item.email}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {item.role}
      </td>

      <td>
        {item.subscription && item.subscription.status === "active"
          ? "Active"
          : "Not Active"}
      </td>

      <td>
      <div className="flex items-center justify-evenly">
      <button
      onClick={()=>updateHandler(item._id)}
      >
          <RiExchangeBoxFill color="blue" />
        </button>
        <button
        onClick={() => deleteButtonHandler(item._id)}
        >
          <RiDeleteBin7Fill color="red" />
        </button>
      
      
      </div>
        
      </td>
    </tr>
  );
}
