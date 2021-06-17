export declare type Props<
	mapStateToProps extends (...args: any) => void,
	mapDispatchToProps,
	componentProps = never
> = componentProps extends never
	? ReturnType<mapStateToProps> & mapDispatchToProps
	: ReturnType<mapStateToProps> & mapDispatchToProps & componentProps;
