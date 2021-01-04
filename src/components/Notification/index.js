import React from 'react';
import { connect } from 'react-redux';
import NotificationsSystem, { atalhoTheme, dismissNotification, NotificationsProvider } from 'reapop';

function NotificationComponent({ notifications, children }) {
	return (
		<>
			<NotificationsSystem
				// 2. Pass the notifications you want Reapop to display.
				notifications={notifications}
				// 3. Pass the function used to dismiss a notification.
				dismissNotification={(id) => dismissNotification(id)}
				// 4. Pass a builtIn theme or a custom theme.
				theme={atalhoTheme}
			/>
			<NotificationsProvider>{children}</NotificationsProvider>
		</>
	);
}
const mapStateToProps = (state) => ({
	notifications: state.Notifications,
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(NotificationComponent);
