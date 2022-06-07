// import {useNavigate} from 'react-router-dom';

// const gotoRouter = (route) => {
// 	const navigate = useNavigate();
// 	navigate(route);
// };

// export default gotoRouter;

const gotoRouter = (startTransition,route) => {
	startTransition(() => {
		route();
	});
};

export default gotoRouter;