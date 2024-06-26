import './CourseGoals.css';
import Card from '../UI/Card';
import GoalItem from './GoalItem';

function CourseGoals({goals, onDeleteGoal}) {
  const hasNoGoals = !goals || goals.length === 0;

  return (
    <section id='course-goals'>
      <Card>
        {hasNoGoals && <h2>No goals found. Start adding some!</h2>}
        <ul>
          {goals.map((goal) => (
            <GoalItem
              key={goal.id}
              id={goal.id}
              text={goal.text}
              onDelete={onDeleteGoal}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
}

export default CourseGoals
