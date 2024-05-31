import "./GoalItem.css";

function GoalItem({ onDelete, id, text }) {
  return (
    <li className="goal-item" onClick={onDelete.bind(null, id)}>
      {text}
    </li>
  );
}

export default GoalItem;
