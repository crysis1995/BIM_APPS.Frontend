import React from 'react';
import { RootState } from '../../../../../store';
import GeneralActions from '../../../redux/monolithic/general/actions';
import { selectorIsRotationDayInputHidden } from './Selector.IsRotationDayInputHidden';
import { selectorIsDateInputHidden } from './Selector.IsDateInputHidden';
import { SelectorDateInputIsDisabled } from './Selector.DateInputIsDisabled';
import { IncrementDecrementButton, IncrementDecrementEnum } from './IncrementDecrementButton';
import { DateInput } from './DateInput';
import { RotationDayInput } from './RotationDayInput';
import { connect } from 'react-redux';

function Hidden({ when, children }: { when: boolean; children: JSX.Element }) {
	if (!when) return children;
	return <></>;
}

const mapStateToProps = (state: RootState) => ({
	rotation_day: state.WorkProgress.Monolithic.General.rotation_day,
	buttonIsDisabled: SelectorDateInputIsDisabled(state),
	isDateInputHidden: selectorIsDateInputHidden(state),
	isRotationDayInputHidden: selectorIsRotationDayInputHidden(state),
	date: state.WorkProgress.Monolithic.General.date,
	validRotationDay: state.WorkProgress.Monolithic.General.validRotationDay,
});

const mapDispatchToProps = {
	IncrementDay: GeneralActions.IncrementDay,
	DecrementDay: GeneralActions.DecrementDay,
	TrySetDate: GeneralActions.TrySetDate,
	TrySetRotationDay: GeneralActions.TrySetRotationDay,
};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

function DateComponent(props: Props) {
	return (
		<div className="w-75">
			<div className="d-flex justify-content-between">
				<IncrementDecrementButton
					type={IncrementDecrementEnum.Decrement}
					disabled={props.buttonIsDisabled}
					onClick={props.DecrementDay}
				/>
				<Hidden when={props.isDateInputHidden}>
					<DateInput
						disabled={props.buttonIsDisabled}
						onChange={props.TrySetDate}
						date={props.date}
						validRotationDay={props.validRotationDay}
					/>
				</Hidden>
				<Hidden when={props.isRotationDayInputHidden}>
					<RotationDayInput
						disabled={props.buttonIsDisabled}
						onChange={props.TrySetRotationDay}
						value={props.rotation_day}
						validRotationDay={props.validRotationDay}
					/>
				</Hidden>
				<IncrementDecrementButton
					type={IncrementDecrementEnum.Increment}
					disabled={props.buttonIsDisabled}
					onClick={props.IncrementDay}
				/>
			</div>
		</div>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(DateComponent);
