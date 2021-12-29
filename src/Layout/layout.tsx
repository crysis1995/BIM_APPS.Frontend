import * as React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Navigate, Route, Routes } from 'react-router-dom';
import ModalComponent from '../components/Modal';
import NotificationComponent from '../components/Notification';
import Loader from '../components/Loader';
import AppRoutes from '../pages/appRoutes';

const Header = React.lazy(() => import('./header'));
const MainComponent = React.lazy(() => import('../pages/main'));
const WorkProgressLayout = React.lazy(() => import('../pages/work-progress'));
const ModelViewer = React.lazy(() => import('../pages/model-viewer'));
// const ConstructionMaterialsLayout = React.lazy(
// 	() => import('../sites/construction_materials/layout'),
// );
// const WorkersLogComponent = React.lazy(() => import('../sites/workers_log/layout'));
const Login = React.lazy(() => import('../pages/login'));
const Account = React.lazy(() => import('../pages/account'));

function Layout() {
	return (
		<>
			<Container
				fluid
				style={{
					minHeight: window.innerHeight,
					maxHeight: window.innerHeight,
					paddingLeft: 0,
					paddingRight: 0,
				}}>
				<Header />
				<NotificationComponent />
				<ModalComponent />
				<Row
					noGutters
					style={{
						maxHeight: window.innerHeight - 56,
						minHeight: window.innerHeight - 56,
					}}
					className="justify-content-md-center">
					<Routes>
						<Route
							path={`/${AppRoutes.Login}`}
							element={
								<React.Suspense fallback={<Loader />}>
									<Login />
								</React.Suspense>
							}
						/>
						<Route
							path={`/${AppRoutes.Account}/*`}
							element={
								<React.Suspense fallback={<Loader />}>
									<Account />
								</React.Suspense>
							}
						/>
						<Route
							path={`/${AppRoutes.WorkProgress}/*`}
							element={
								<React.Suspense fallback={<Loader />}>
									<WorkProgressLayout />
								</React.Suspense>
							}
						/>
						{/*<Route*/}
						{/*	path={`/${EApplications.WORKERS_LOG}`}*/}
						{/*	element={*/}
						{/*		<React.Suspense fallback={<Loader />}>*/}
						{/*			<WorkersLogComponent />*/}
						{/*		</React.Suspense>*/}
						{/*	}*/}
						{/*/>*/}
						<Route
							path={`/${AppRoutes.ModelViewer}`}
							element={
								<React.Suspense fallback={<Loader />}>
									<ModelViewer />
								</React.Suspense>
							}
						/>
						{/*<Route*/}
						{/*	path={`/${EApplications.CONSTRUCTION_MATERIALS}/:module`}*/}
						{/*	element={*/}
						{/*		<React.Suspense fallback={<Loader />}>*/}
						{/*			<ConstructionMaterialsLayout />*/}
						{/*		</React.Suspense>*/}
						{/*	}*/}
						{/*/>*/}
						<Route
							path="/"
							element={
								<React.Suspense fallback={<Loader />}>
									<MainComponent />
								</React.Suspense>
							}
						/>
						<Route path={'*'} element={<Navigate replace to="/" />} />
					</Routes>
				</Row>
			</Container>
		</>
	);
}

export default Layout;
