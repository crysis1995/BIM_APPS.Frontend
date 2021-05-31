export type Props<
	mapStateToProps extends (...args: any) => any,
	mapDispatchToProps,
	ComponentProps
> = ReturnType<mapStateToProps> & mapDispatchToProps & ComponentProps;
