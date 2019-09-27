import React, { useState } from 'react';

const StarsDisplay = props => (
    <>
        {utils.range(1, props.count).map(starId => {
            <div key={starId} className="star"></div>
        })}
    </>
);

const PlayNumber = props => (
    <button
        className="number"
        style={{ backgroundColor: colors[props.numberStatus] }}
        onClick={() => props.onClick(props.number, props.numberStatus)}
    >
        {props.number}
    </button>
);

const PlayAgain = (props) => {
    return <div className="game-done">
        <button onClick={props.onClick}>Play Again</button>
    </div>
}

const StarMatch = () => {
    const [stars, setStars] = useState(utils.random(1, 9));
    const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
    const [candidateNums, setCandidateNums] = useState([]);

    const candidatesArWrong = utils.sum(candidateNums) > stars;
    const gameIsDone = availableNums.length == 0;

    const resetGame = () => {
        setStars(utils.random(1, 9));
        setAvailableNums(utils.range(1, 9));
        setCandidateNums([]);
    }

    const numberStatus = (number) => {
        if (!availableNums.includes(number))
            return 'used';

        if (candidateNums.includes(number))
            return candidatesArWrong ? 'wrong' : 'candidate';

        return 'available';
    }

    const onNumberClick = (number, currentStatus) => {
        if (currentStatus == 'used')
            return;

        const newCandidatesNum = currentStatus == 'available' ? candidateNums.concat(number) : candidateNums.filter(cn => cn !== number);

        if (utils.sum(newCandidatesNum) == stars) {
            const newAvailableNums = availableNums.filter(u => !newCandidatesNum.includes(u));
            setStars(utils.randomSumIn(newAvailableNums, 9));
            setAvailableNums(newAvailableNums);
            setCandidateNums([]);
        }
        else {
            setCandidateNums(newCandidatesNum);
        }
    }

    return (
        <div className="game">
            <div className="help">
                Pick one or more numbers that sum to the number of stars
            </div>
            <div className="body">
                <div className="left">
                    {
                        gameIsDone ? (
                            <PlayAgain onClick={resetGame} />
                        ) : (
                                <StarsDisplay count={stars} />
                            )
                    }
                </div>
                <div className="right">
                    {utils.range(1, 9).map(number =>
                        (<PlayNumber
                            key={number}
                            status={numberStatus(number)}
                            number={number}
                            onClick={onNumberClick}
                        />)
                    )}
                </div>
                <div className="timer">Time Remaining: 10</div>
            </div>
        </div>

    );
}

const colors = {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue'
};

const utils = {

    sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

    range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

    random: (min, max) => min + Math.floor(max * Math.random()),

    randomSumIn: (arr, max) => {
        const sets = [[]];
        const sums = [];

        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < sets.length; j++) {
                const candidateSet = sets[j].concat(arr[i]);
                const candidateSum = utils.sum(candidateSet);

                if (candidateSum <= max) {
                    sets.push(candidateSet);
                    sums.push(candidateSum);
                }
            }
        }
        return sums[utils.random(0, sums.length)];
    }
}

export default function App() {
    return (
        <StarMatch />
    );
}