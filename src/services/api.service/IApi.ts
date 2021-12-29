export interface IOperations{}

export default interface IApi{
	GetToken():string | null;
	SetToken(token:string | null):void;
	Operations:IOperations;
}