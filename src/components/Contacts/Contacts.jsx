import PropTypes from "prop-types";
import { useSelector } from "react-redux";
// import { getVisibleContacts } from "../../redux/contacts/contacts-selectors";
import { getFilter } from "../../redux/contacts/contacts-selectors";
import { useFetchContactsQuery } from "../../redux/contacts/contacts-slice";
import css from "../Contacts/Contacts.module.css";

const Contacts = ({ onDelete, deleting }) => {
  const { data: Contacts } = useFetchContactsQuery();
  const filterValue = useSelector((state) => getFilter(state));
  const contactsFilter = Contacts?.filter((contact) =>
    contact.name.toLowerCase().includes(filterValue.toLowerCase())
  );
  // const dispatch = useDispatch();
  // const contacts = useSelector(getVisibleContacts);

  // const onClick = (id) => dispatch(contactsActions.deleteContacts(id));

  return (
    <>
      <h2 className={css.title}>Contacts</h2>
      <ul>
        {Contacts &&
          contactsFilter.map((contact) => (
            <li className={css.item} key={contact.id}>
              <p className={css.text}>
                {contact.name}: {contact.number}
              </p>
              <button
                className={css.button}
                onClick={() => onDelete(contact.id)}
                type="button"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Contacts;

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
