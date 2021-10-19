import Form from "../components/Form/Form";
import Contacts from "../components/Contacts/Contacts";
import Filter from "../components/Filter/Filter";
import {
  useFetchContactsQuery,
  useDeleteContactMutation,
  useCreateContactMutation,
} from "../redux/contacts/contacts-slice";
import Loader from "react-loader-spinner";
import css from "../../src/App.css";

export default function App() {
  const { data: contacts, isFetching } = useFetchContactsQuery();
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();

  return (
    <>
      <Form />
      <Filter />
      {isFetching && (
        <Loader
          type="Circles"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000}
        />
      )}
      {contacts && (
        <Contacts
          contacts={contacts}
          onDelete={deleteContact}
          deleting={isDeleting}
        />
      )}
    </>
  );
}
