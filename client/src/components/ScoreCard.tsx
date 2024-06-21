import { FC, Fragment } from "react";
import Card from "./common/Card";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";

interface ScoreCellProps {
  score: number;
  label: string;
}

const ScoreCell: FC<ScoreCellProps> = ({ score, label }) => (
  <div className="flex flex-col items-center font-semibold w-20">
    <span className="text-blue text-5xl">{score}</span>
    <span className="text-gray text-2xl">{label}</span>
  </div>
);

const ScoreCard = () => {
  const { history } = useSelector((state: RootState) => state.wheel);
  return (
    <Card>
      <div className="flex justify-center items-center p-16 py-8 mx-4 my-6">
        {history.map(({ label, occurrences }, index) => (
          <Fragment key={uuidv4()}>
            <ScoreCell score={occurrences} label={label} />
            {history.length - 1 !== index && (
              <div className="divider divider-horizontal mx-score-divider-custom--sm"></div>
            )}
          </Fragment>
        ))}
      </div>
    </Card>
  );
};

export default ScoreCard;
