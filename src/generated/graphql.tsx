import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Any: any;
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: any;
  /** The built-in `Decimal` scalar type. */
  Decimal: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AddAppInput = {
  appName: AppEnum;
  moduleName: AppModulesEnum;
};

export type AppDto = {
  __typename?: 'AppDto';
  success: Scalars['Boolean'];
};

export enum AppEnum {
  ModelViewer = 'MODEL_VIEWER',
  WorkersLogLabourInput = 'WORKERS_LOG_LABOUR_INPUT',
  WorkersLogWorkTimeEvidence = 'WORKERS_LOG_WORK_TIME_EVIDENCE',
  WorkProgressGeneral = 'WORK_PROGRESS_GENERAL',
  WorkProgressMonolithic = 'WORK_PROGRESS_MONOLITHIC',
  WorkProgressPrecast = 'WORK_PROGRESS_PRECAST'
}

export type AppEnumOperationFilterInput = {
  eq?: InputMaybe<AppEnum>;
  in?: InputMaybe<Array<AppEnum>>;
  neq?: InputMaybe<AppEnum>;
  nin?: InputMaybe<Array<AppEnum>>;
};

export enum AppModulesEnum {
  ModelViewer = 'MODEL_VIEWER',
  WorkersLogLabourInput = 'WORKERS_LOG_LABOUR_INPUT',
  WorkersLogWorkTimeEvidence = 'WORKERS_LOG_WORK_TIME_EVIDENCE',
  WorkProgressBasePlan = 'WORK_PROGRESS_BASE_PLAN',
  WorkProgressDelays = 'WORK_PROGRESS_DELAYS',
  WorkProgressElementComments = 'WORK_PROGRESS_ELEMENT_COMMENTS',
  WorkProgressStatuses = 'WORK_PROGRESS_STATUSES',
  WorkProgressTerms = 'WORK_PROGRESS_TERMS'
}

export type AppModulesEnumOperationFilterInput = {
  eq?: InputMaybe<AppModulesEnum>;
  in?: InputMaybe<Array<AppModulesEnum>>;
  neq?: InputMaybe<AppModulesEnum>;
  nin?: InputMaybe<Array<AppModulesEnum>>;
};

export type AppPayload = {
  __typename?: 'AppPayload';
  appName: AppEnum;
  id: Scalars['Int'];
  moduleName: AppModulesEnum;
};

export enum ApplyPolicy {
  AfterResolver = 'AFTER_RESOLVER',
  BeforeResolver = 'BEFORE_RESOLVER'
}

export type BimModel = {
  __typename?: 'BimModel';
  bimModelsCranes: Array<BimModel_Crane>;
  bimModelsLevels: Array<BimModel_Level>;
  cranes: Array<Crane>;
  createdAt: Scalars['DateTime'];
  defaultViewName?: Maybe<Scalars['String']>;
  elements: Array<Element>;
  id: Scalars['Int'];
  levels: Array<Level>;
  modelUrn: Scalars['String'];
  name: Scalars['String'];
  project: Project;
  projectId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type BimModelFilterInput = {
  and?: InputMaybe<Array<BimModelFilterInput>>;
  bimModelsCranes?: InputMaybe<ListFilterInputTypeOfBimModel_CraneFilterInput>;
  bimModelsLevels?: InputMaybe<ListFilterInputTypeOfBimModel_LevelFilterInput>;
  cranes?: InputMaybe<ListFilterInputTypeOfCraneFilterInput>;
  createdAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  defaultViewName?: InputMaybe<StringOperationFilterInput>;
  elements?: InputMaybe<ListFilterInputTypeOfElementFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  levels?: InputMaybe<ListFilterInputTypeOfLevelFilterInput>;
  modelUrn?: InputMaybe<StringOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<BimModelFilterInput>>;
  project?: InputMaybe<ProjectFilterInput>;
  projectId?: InputMaybe<ComparableInt32OperationFilterInput>;
  updatedAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
};

export type BimModelSortInput = {
  createdAt?: InputMaybe<SortEnumType>;
  defaultViewName?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  modelUrn?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  project?: InputMaybe<ProjectSortInput>;
  projectId?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
};

export type BimModel_Crane = {
  __typename?: 'BimModel_Crane';
  crane: Crane;
  craneId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  model: BimModel;
  modelId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type BimModel_CraneFilterInput = {
  and?: InputMaybe<Array<BimModel_CraneFilterInput>>;
  crane?: InputMaybe<CraneFilterInput>;
  craneId?: InputMaybe<ComparableInt32OperationFilterInput>;
  createdAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  model?: InputMaybe<BimModelFilterInput>;
  modelId?: InputMaybe<ComparableInt32OperationFilterInput>;
  or?: InputMaybe<Array<BimModel_CraneFilterInput>>;
  updatedAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
};

export type BimModel_Level = {
  __typename?: 'BimModel_Level';
  createdAt: Scalars['DateTime'];
  level: Level;
  levelId: Scalars['Int'];
  model: BimModel;
  modelId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type BimModel_LevelFilterInput = {
  and?: InputMaybe<Array<BimModel_LevelFilterInput>>;
  createdAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  level?: InputMaybe<LevelFilterInput>;
  levelId?: InputMaybe<ComparableInt32OperationFilterInput>;
  model?: InputMaybe<BimModelFilterInput>;
  modelId?: InputMaybe<ComparableInt32OperationFilterInput>;
  or?: InputMaybe<Array<BimModel_LevelFilterInput>>;
  updatedAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
};

export type BooleanOperationFilterInput = {
  eq?: InputMaybe<Scalars['Boolean']>;
  neq?: InputMaybe<Scalars['Boolean']>;
};

export type ClaimPayload = {
  __typename?: 'ClaimPayload';
  app: AppPayload;
  appId: Scalars['Int'];
  project?: Maybe<Project>;
  projectId: Scalars['Int'];
  userId: Scalars['String'];
  value: Scalars['String'];
};

export type CommentaryElement = {
  __typename?: 'CommentaryElement';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  element: Element;
  elementId: Scalars['Int'];
  id: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type CommentaryElementFilterInput = {
  and?: InputMaybe<Array<CommentaryElementFilterInput>>;
  content?: InputMaybe<StringOperationFilterInput>;
  createdAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  element?: InputMaybe<ElementFilterInput>;
  elementId?: InputMaybe<ComparableInt32OperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  or?: InputMaybe<Array<CommentaryElementFilterInput>>;
  updatedAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  userId?: InputMaybe<StringOperationFilterInput>;
};

export type CommentaryElementSortInput = {
  content?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  element?: InputMaybe<ElementSortInput>;
  elementId?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
  userId?: InputMaybe<SortEnumType>;
};

export type ComparableDateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  neq?: InputMaybe<Scalars['DateTime']>;
  ngt?: InputMaybe<Scalars['DateTime']>;
  ngte?: InputMaybe<Scalars['DateTime']>;
  nin?: InputMaybe<Array<Scalars['DateTime']>>;
  nlt?: InputMaybe<Scalars['DateTime']>;
  nlte?: InputMaybe<Scalars['DateTime']>;
};

export type ComparableDecimalOperationFilterInput = {
  eq?: InputMaybe<Scalars['Decimal']>;
  gt?: InputMaybe<Scalars['Decimal']>;
  gte?: InputMaybe<Scalars['Decimal']>;
  in?: InputMaybe<Array<Scalars['Decimal']>>;
  lt?: InputMaybe<Scalars['Decimal']>;
  lte?: InputMaybe<Scalars['Decimal']>;
  neq?: InputMaybe<Scalars['Decimal']>;
  ngt?: InputMaybe<Scalars['Decimal']>;
  ngte?: InputMaybe<Scalars['Decimal']>;
  nin?: InputMaybe<Array<Scalars['Decimal']>>;
  nlt?: InputMaybe<Scalars['Decimal']>;
  nlte?: InputMaybe<Scalars['Decimal']>;
};

export type ComparableInt32OperationFilterInput = {
  eq?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  neq?: InputMaybe<Scalars['Int']>;
  ngt?: InputMaybe<Scalars['Int']>;
  ngte?: InputMaybe<Scalars['Int']>;
  nin?: InputMaybe<Array<Scalars['Int']>>;
  nlt?: InputMaybe<Scalars['Int']>;
  nlte?: InputMaybe<Scalars['Int']>;
};

export type ComparableNullableOfDateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  neq?: InputMaybe<Scalars['DateTime']>;
  ngt?: InputMaybe<Scalars['DateTime']>;
  ngte?: InputMaybe<Scalars['DateTime']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  nlt?: InputMaybe<Scalars['DateTime']>;
  nlte?: InputMaybe<Scalars['DateTime']>;
};

export type ComparableNullableOfDecimalOperationFilterInput = {
  eq?: InputMaybe<Scalars['Decimal']>;
  gt?: InputMaybe<Scalars['Decimal']>;
  gte?: InputMaybe<Scalars['Decimal']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Decimal']>>>;
  lt?: InputMaybe<Scalars['Decimal']>;
  lte?: InputMaybe<Scalars['Decimal']>;
  neq?: InputMaybe<Scalars['Decimal']>;
  ngt?: InputMaybe<Scalars['Decimal']>;
  ngte?: InputMaybe<Scalars['Decimal']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Decimal']>>>;
  nlt?: InputMaybe<Scalars['Decimal']>;
  nlte?: InputMaybe<Scalars['Decimal']>;
};

export type ComparableNullableOfInt32OperationFilterInput = {
  eq?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  neq?: InputMaybe<Scalars['Int']>;
  ngt?: InputMaybe<Scalars['Int']>;
  ngte?: InputMaybe<Scalars['Int']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  nlt?: InputMaybe<Scalars['Int']>;
  nlte?: InputMaybe<Scalars['Int']>;
};

export type Crane = {
  __typename?: 'Crane';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  models: Array<BimModel>;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type CraneFilterInput = {
  and?: InputMaybe<Array<CraneFilterInput>>;
  createdAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  models?: InputMaybe<ListFilterInputTypeOfBimModelFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<CraneFilterInput>>;
  updatedAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
};

export type CraneSortInput = {
  createdAt?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
};

export type CreateBimModelDtoInput = {
  cranes?: InputMaybe<Array<EntityInput>>;
  defaultViewName?: InputMaybe<Scalars['String']>;
  levels?: InputMaybe<Array<EntityInput>>;
  modelUrn: Scalars['String'];
  name: Scalars['String'];
  project: EntityInput;
};

export type CreateCommentaryElementDtoInput = {
  content: Scalars['String'];
  element: EntityInput;
  user: UserInput;
};

export type CreateCraneDtoInput = {
  name: Scalars['String'];
};

export type CreateCrewDtoInput = {
  crewWorkType: CrewWorkTypeEnum;
  name: Scalars['String'];
  owner: EntityInput;
  project: EntityInput;
};

export type CreateCrewSummaryDtoInput = {
  crew: EntityInput;
  endDate: Scalars['DateTime'];
  project: EntityInput;
  startDate: Scalars['DateTime'];
  user: EntityInput;
  workers: Array<EntityInput>;
};

export type CreateCustomParamDtoInput = {
  canBeNull: Scalars['Boolean'];
  description: Scalars['String'];
  isCustom: Scalars['Boolean'];
  key?: InputMaybe<Scalars['String']>;
  type: CustomParamsDataTypes;
};

export type CreateCustomParamProjectDtoInput = {
  customParamsId: Scalars['Int'];
  projectId: Scalars['Int'];
};

export type CreateDelayCauseDtoInput = {
  isMain: Scalars['Boolean'];
  name: Scalars['String'];
  parent?: InputMaybe<EntityInput>;
};

export type CreateDelayDtoInput = {
  commentary: Scalars['String'];
  crane?: InputMaybe<EntityInput>;
  date: Scalars['DateTime'];
  delayCauses: Array<EntityInput>;
  level?: InputMaybe<EntityInput>;
  project: EntityInput;
  user: EntityInput;
};

export type CreateElementDtoInput = {
  area?: InputMaybe<Scalars['Decimal']>;
  bimModel?: InputMaybe<EntityInput>;
  crane?: InputMaybe<EntityInput>;
  details?: InputMaybe<Scalars['String']>;
  isPrefabricated: Scalars['Boolean'];
  level?: InputMaybe<EntityInput>;
  project: EntityInput;
  realisationMode?: InputMaybe<Scalars['String']>;
  revitId: Scalars['Int'];
  rotationDay?: InputMaybe<Scalars['Int']>;
  runningMetre?: InputMaybe<Scalars['Decimal']>;
  vertical?: InputMaybe<VerticalEnum>;
  volume?: InputMaybe<Scalars['Decimal']>;
};

export type CreateElementStatusDtoInput = {
  date: Scalars['DateTime'];
  element: EntityInput;
  project: EntityInput;
  status: StatusEnum;
  user: EntityInput;
};

export type CreateElementTermDtoInput = {
  element: EntityInput;
  plannedFinish?: InputMaybe<Scalars['DateTime']>;
  plannedFinishBP?: InputMaybe<Scalars['DateTime']>;
  plannedStart?: InputMaybe<Scalars['DateTime']>;
  plannedStartBP?: InputMaybe<Scalars['DateTime']>;
  realFinish?: InputMaybe<Scalars['DateTime']>;
  realStart?: InputMaybe<Scalars['DateTime']>;
};

export type CreateElementsTimeEvidenceDtoInput = {
  crew: EntityInput;
  date: Scalars['DateTime'];
  elements: Array<EntityInput>;
  project: EntityInput;
  user: EntityInput;
  workedTime: Scalars['Decimal'];
};

export type CreateGroupTermDtoInput = {
  crane?: InputMaybe<EntityInput>;
  level?: InputMaybe<EntityInput>;
  plannedFinish?: InputMaybe<Scalars['DateTime']>;
  plannedFinishBP?: InputMaybe<Scalars['DateTime']>;
  plannedStart?: InputMaybe<Scalars['DateTime']>;
  plannedStartBP?: InputMaybe<Scalars['DateTime']>;
  project: EntityInput;
  realFinish?: InputMaybe<Scalars['DateTime']>;
  realStart?: InputMaybe<Scalars['DateTime']>;
  terms: Array<EntityInput>;
  vertical: VerticalEnum;
};

export type CreateGroupedOtherWorkTimeEvidenceDtoInput = {
  crew: EntityInput;
  crewType: CrewTypeEnum;
  date: Scalars['DateTime'];
  level: EntityInput;
  project: EntityInput;
};

export type CreateLevelDtoInput = {
  name: Scalars['String'];
};

export type CreateOtherWorkOptionDtoInput = {
  crewType: CrewTypeEnum;
  crewWorkType: CrewWorkTypeEnum;
  name: Scalars['String'];
};

export type CreateOtherWorksTimeEvidenceDtoInput = {
  description?: InputMaybe<Scalars['String']>;
  groupedOtherWorkTimeEvidence?: InputMaybe<EntityInput>;
  otherWorkOption: EntityInput;
  otherWorkType: OtherWorkTypeEnum;
  type: CrewWorkTypeEnum;
  workedTime: Scalars['Decimal'];
};

export type CreateProjectDtoInput = {
  centralScheduleSync?: Scalars['Boolean'];
  metodologyCode?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  projectRange?: InputMaybe<ProjectRangeDtoInput>;
  supportedAppModules: Array<AppModulesEnum>;
  supportedApps: Array<AppEnum>;
  supportedStatuses: Array<StatusEnum>;
  webconCode?: InputMaybe<Scalars['String']>;
};

export type CreateWorkerDtoInput = {
  crewWorkType?: InputMaybe<CrewWorkTypeEnum>;
  name?: InputMaybe<Scalars['String']>;
  user: EntityInput;
  warbudId?: InputMaybe<Scalars['String']>;
};

export type CreateWorkerTimeEvidenceDtoInput = {
  crewSummary: EntityInput;
  date: Scalars['DateTime'];
  project: EntityInput;
  user: EntityInput;
  workedTime: Scalars['Decimal'];
  worker: EntityInput;
};

export type Crew = {
  __typename?: 'Crew';
  createdAt: Scalars['DateTime'];
  crewWorkType: CrewWorkTypeEnum;
  id: Scalars['Int'];
  name: Scalars['String'];
  project: Project;
  projectId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type CrewFilterInput = {
  and?: InputMaybe<Array<CrewFilterInput>>;
  createdAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  crewWorkType?: InputMaybe<CrewWorkTypeEnumOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<CrewFilterInput>>;
  project?: InputMaybe<ProjectFilterInput>;
  projectId?: InputMaybe<ComparableInt32OperationFilterInput>;
  updatedAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  userId?: InputMaybe<StringOperationFilterInput>;
};

export type CrewSortInput = {
  createdAt?: InputMaybe<SortEnumType>;
  crewWorkType?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  project?: InputMaybe<ProjectSortInput>;
  projectId?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
  userId?: InputMaybe<SortEnumType>;
};

export type CrewSummary = {
  __typename?: 'CrewSummary';
  createdAt: Scalars['DateTime'];
  crew: Crew;
  crewId: Scalars['Int'];
  endDate: Scalars['DateTime'];
  id: Scalars['Int'];
  project: Project;
  projectId: Scalars['Int'];
  startDate: Scalars['DateTime'];
  timeEvidences: Array<WorkerTimeEvidence>;
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
  workers: Array<Worker>;
};

export type CrewSummaryFilterInput = {
  and?: InputMaybe<Array<CrewSummaryFilterInput>>;
  createdAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  crew?: InputMaybe<CrewFilterInput>;
  crewId?: InputMaybe<ComparableInt32OperationFilterInput>;
  endDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  or?: InputMaybe<Array<CrewSummaryFilterInput>>;
  project?: InputMaybe<ProjectFilterInput>;
  projectId?: InputMaybe<ComparableInt32OperationFilterInput>;
  startDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  timeEvidences?: InputMaybe<ListFilterInputTypeOfWorkerTimeEvidenceFilterInput>;
  updatedAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  userId?: InputMaybe<StringOperationFilterInput>;
  workers?: InputMaybe<ListFilterInputTypeOfWorkerFilterInput>;
};

export type CrewSummarySortInput = {
  createdAt?: InputMaybe<SortEnumType>;
  crew?: InputMaybe<CrewSortInput>;
  crewId?: InputMaybe<SortEnumType>;
  endDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  project?: InputMaybe<ProjectSortInput>;
  projectId?: InputMaybe<SortEnumType>;
  startDate?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
  userId?: InputMaybe<SortEnumType>;
};

export enum CrewTypeEnum {
  HouseCrew = 'HOUSE_CREW',
  SubcontractorCrew = 'SUBCONTRACTOR_CREW'
}

export type CrewTypeEnumOperationFilterInput = {
  eq?: InputMaybe<CrewTypeEnum>;
  in?: InputMaybe<Array<CrewTypeEnum>>;
  neq?: InputMaybe<CrewTypeEnum>;
  nin?: InputMaybe<Array<CrewTypeEnum>>;
};

export enum CrewWorkTypeEnum {
  Carpenter = 'CARPENTER',
  GeneralConstructor = 'GENERAL_CONSTRUCTOR',
  SteelFixer = 'STEEL_FIXER'
}

export type CrewWorkTypeEnumOperationFilterInput = {
  eq?: InputMaybe<CrewWorkTypeEnum>;
  in?: InputMaybe<Array<CrewWorkTypeEnum>>;
  neq?: InputMaybe<CrewWorkTypeEnum>;
  nin?: InputMaybe<Array<CrewWorkTypeEnum>>;
};

export type CustomParamProject = {
  __typename?: 'CustomParamProject';
  createdAt: Scalars['DateTime'];
  customParams: CustomParams;
  customParamsId: Scalars['Int'];
  project: Project;
  projectId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type CustomParamProjectFilterInput = {
  and?: InputMaybe<Array<CustomParamProjectFilterInput>>;
  createdAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  customParams?: InputMaybe<CustomParamsFilterInput>;
  customParamsId?: InputMaybe<ComparableInt32OperationFilterInput>;
  or?: InputMaybe<Array<CustomParamProjectFilterInput>>;
  project?: InputMaybe<ProjectFilterInput>;
  projectId?: InputMaybe<ComparableInt32OperationFilterInput>;
  updatedAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
};

export type CustomParamProjectSortInput = {
  createdAt?: InputMaybe<SortEnumType>;
  customParams?: InputMaybe<CustomParamsSortInput>;
  customParamsId?: InputMaybe<SortEnumType>;
  project?: InputMaybe<ProjectSortInput>;
  projectId?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
};

export type CustomParamValue = {
  __typename?: 'CustomParamValue';
  createdAt: Scalars['DateTime'];
  customParams: CustomParams;
  customParamsId: Scalars['Int'];
  element: Element;
  elementId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  value?: Maybe<Scalars['String']>;
};

export type CustomParamValueFilterInput = {
  and?: InputMaybe<Array<CustomParamValueFilterInput>>;
  createdAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  customParams?: InputMaybe<CustomParamsFilterInput>;
  customParamsId?: InputMaybe<ComparableInt32OperationFilterInput>;
  element?: InputMaybe<ElementFilterInput>;
  elementId?: InputMaybe<ComparableInt32OperationFilterInput>;
  or?: InputMaybe<Array<CustomParamValueFilterInput>>;
  updatedAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  value?: InputMaybe<StringOperationFilterInput>;
};

export type CustomParams = {
  __typename?: 'CustomParams';
  canBeNull: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  customParamProject: Array<CustomParamProject>;
  customParamValue: Array<CustomParamValue>;
  description: Scalars['String'];
  id: Scalars['Int'];
  isCustom: Scalars['Boolean'];
  key?: Maybe<Scalars['String']>;
  project: Array<Project>;
  type: CustomParamsDataTypes;
  updatedAt: Scalars['DateTime'];
};

export enum CustomParamsDataTypes {
  Bool = 'BOOL',
  Date = 'DATE',
  Float = 'FLOAT',
  Integer = 'INTEGER',
  String = 'STRING'
}

export type CustomParamsDataTypesOperationFilterInput = {
  eq?: InputMaybe<CustomParamsDataTypes>;
  in?: InputMaybe<Array<CustomParamsDataTypes>>;
  neq?: InputMaybe<CustomParamsDataTypes>;
  nin?: InputMaybe<Array<CustomParamsDataTypes>>;
};

export type CustomParamsFilterInput = {
  and?: InputMaybe<Array<CustomParamsFilterInput>>;
  canBeNull?: InputMaybe<BooleanOperationFilterInput>;
  createdAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  customParamProject?: InputMaybe<ListFilterInputTypeOfCustomParamProjectFilterInput>;
  customParamValue?: InputMaybe<ListFilterInputTypeOfCustomParamValueFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isCustom?: InputMaybe<BooleanOperationFilterInput>;
  key?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<CustomParamsFilterInput>>;
  project?: InputMaybe<ListFilterInputTypeOfProjectFilterInput>;
  type?: InputMaybe<CustomParamsDataTypesOperationFilterInput>;
  updatedAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
};

export type CustomParamsSortInput = {
  canBeNull?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isCustom?: InputMaybe<SortEnumType>;
  key?: InputMaybe<SortEnumType>;
  type?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
};

export enum DataImportType {
  Csv = 'CSV'
}

export type Delay = {
  __typename?: 'Delay';
  commentary: Scalars['String'];
  crane?: Maybe<Crane>;
  craneId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  date: Scalars['DateTime'];
  delayCauses: Array<DelayCause>;
  delayDelayCause: Array<Delay_DelayCause>;
  id: Scalars['Int'];
  level?: Maybe<Level>;
  levelId?: Maybe<Scalars['Int']>;
  project: Project;
  projectId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type DelayCause = {
  __typename?: 'DelayCause';
  createdAt: Scalars['DateTime'];
  delayCauseId?: Maybe<Scalars['Int']>;
  delays: Array<Delay>;
  id: Scalars['Int'];
  isMain: Scalars['Boolean'];
  name: Scalars['String'];
  parent?: Maybe<DelayCause>;
  updatedAt: Scalars['DateTime'];
};

export type DelayCauseFilterInput = {
  and?: InputMaybe<Array<DelayCauseFilterInput>>;
  createdAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  delayCauseId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  delays?: InputMaybe<ListFilterInputTypeOfDelayFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isMain?: InputMaybe<BooleanOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<DelayCauseFilterInput>>;
  parent?: InputMaybe<DelayCauseFilterInput>;
  updatedAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
};

export type DelayCauseSortInput = {
  createdAt?: InputMaybe<SortEnumType>;
  delayCauseId?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isMain?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  parent?: InputMaybe<DelayCauseSortInput>;
  updatedAt?: InputMaybe<SortEnumType>;
};

export type DelayFilterInput = {
  and?: InputMaybe<Array<DelayFilterInput>>;
  commentary?: InputMaybe<StringOperationFilterInput>;
  crane?: InputMaybe<CraneFilterInput>;
  craneId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  createdAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  date?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  delayCauses?: InputMaybe<ListFilterInputTypeOfDelayCauseFilterInput>;
  delayDelayCause?: InputMaybe<ListFilterInputTypeOfDelay_DelayCauseFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  level?: InputMaybe<LevelFilterInput>;
  levelId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  or?: InputMaybe<Array<DelayFilterInput>>;
  project?: InputMaybe<ProjectFilterInput>;
  projectId?: InputMaybe<ComparableInt32OperationFilterInput>;
  updatedAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  userId?: InputMaybe<StringOperationFilterInput>;
};

export type DelaySortInput = {
  commentary?: InputMaybe<SortEnumType>;
  crane?: InputMaybe<CraneSortInput>;
  craneId?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  date?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  level?: InputMaybe<LevelSortInput>;
  levelId?: InputMaybe<SortEnumType>;
  project?: InputMaybe<ProjectSortInput>;
  projectId?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
  userId?: InputMaybe<SortEnumType>;
};

export type Delay_DelayCause = {
  __typename?: 'Delay_DelayCause';
  cause: DelayCause;
  createdAt: Scalars['DateTime'];
  delay: Delay;
  delayCauseId: Scalars['Int'];
  delayId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type Delay_DelayCauseFilterInput = {
  and?: InputMaybe<Array<Delay_DelayCauseFilterInput>>;
  cause?: InputMaybe<DelayCauseFilterInput>;
  createdAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  delay?: InputMaybe<DelayFilterInput>;
  delayCauseId?: InputMaybe<ComparableInt32OperationFilterInput>;
  delayId?: InputMaybe<ComparableInt32OperationFilterInput>;
  or?: InputMaybe<Array<Delay_DelayCauseFilterInput>>;
  updatedAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
};

export type Element = {
  __typename?: 'Element';
  area?: Maybe<Scalars['Decimal']>;
  bimModel?: Maybe<BimModel>;
  bimModelId?: Maybe<Scalars['Int']>;
  comments: Array<CommentaryElement>;
  crane?: Maybe<Crane>;
  craneId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  customParamValues: Array<CustomParamValue>;
  details?: Maybe<Scalars['String']>;
  elementStatuses: Array<ElementStatus>;
  elementTerm?: Maybe<ElementTerm>;
  elementTermId?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  isPrefabricated: Scalars['Boolean'];
  level?: Maybe<Level>;
  levelId?: Maybe<Scalars['Int']>;
  project: Project;
  projectId: Scalars['Int'];
  realisationMode?: Maybe<Scalars['String']>;
  revitId: Scalars['Int'];
  rotationDay?: Maybe<Scalars['Int']>;
  runningMetre?: Maybe<Scalars['Decimal']>;
  timeEvidences: Array<ElementsTimeEvidence>;
  updatedAt: Scalars['DateTime'];
  vertical?: Maybe<VerticalEnum>;
  volume?: Maybe<Scalars['Decimal']>;
};

export type ElementFilterInput = {
  and?: InputMaybe<Array<ElementFilterInput>>;
  area?: InputMaybe<ComparableNullableOfDecimalOperationFilterInput>;
  bimModel?: InputMaybe<BimModelFilterInput>;
  bimModelId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  comments?: InputMaybe<ListFilterInputTypeOfCommentaryElementFilterInput>;
  crane?: InputMaybe<CraneFilterInput>;
  craneId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  createdAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  customParamValues?: InputMaybe<ListFilterInputTypeOfCustomParamValueFilterInput>;
  details?: InputMaybe<StringOperationFilterInput>;
  elementStatuses?: InputMaybe<ListFilterInputTypeOfElementStatusFilterInput>;
  elementTerm?: InputMaybe<ElementTermFilterInput>;
  elementTermId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isPrefabricated?: InputMaybe<BooleanOperationFilterInput>;
  level?: InputMaybe<LevelFilterInput>;
  levelId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  or?: InputMaybe<Array<ElementFilterInput>>;
  project?: InputMaybe<ProjectFilterInput>;
  projectId?: InputMaybe<ComparableInt32OperationFilterInput>;
  realisationMode?: InputMaybe<StringOperationFilterInput>;
  revitId?: InputMaybe<ComparableInt32OperationFilterInput>;
  rotationDay?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  runningMetre?: InputMaybe<ComparableNullableOfDecimalOperationFilterInput>;
  timeEvidences?: InputMaybe<ListFilterInputTypeOfElementsTimeEvidenceFilterInput>;
  updatedAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  vertical?: InputMaybe<NullableOfVerticalEnumOperationFilterInput>;
  volume?: InputMaybe<ComparableNullableOfDecimalOperationFilterInput>;
};

export type ElementSortInput = {
  area?: InputMaybe<SortEnumType>;
  bimModel?: InputMaybe<BimModelSortInput>;
  bimModelId?: InputMaybe<SortEnumType>;
  crane?: InputMaybe<CraneSortInput>;
  craneId?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  details?: InputMaybe<SortEnumType>;
  elementTerm?: InputMaybe<ElementTermSortInput>;
  elementTermId?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isPrefabricated?: InputMaybe<SortEnumType>;
  level?: InputMaybe<LevelSortInput>;
  levelId?: InputMaybe<SortEnumType>;
  project?: InputMaybe<ProjectSortInput>;
  projectId?: InputMaybe<SortEnumType>;
  realisationMode?: InputMaybe<SortEnumType>;
  revitId?: InputMaybe<SortEnumType>;
  rotationDay?: InputMaybe<SortEnumType>;
  runningMetre?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
  vertical?: InputMaybe<SortEnumType>;
  volume?: InputMaybe<SortEnumType>;
};

export type ElementStatus = {
  __typename?: 'ElementStatus';
  createdAt: Scalars['DateTime'];
  date: Scalars['DateTime'];
  element: Element;
  elementId: Scalars['Int'];
  id: Scalars['Int'];
  project: Project;
  projectId: Scalars['Int'];
  status: StatusEnum;
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type ElementStatusFilterInput = {
  and?: InputMaybe<Array<ElementStatusFilterInput>>;
  createdAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  date?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  element?: InputMaybe<ElementFilterInput>;
  elementId?: InputMaybe<ComparableInt32OperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  or?: InputMaybe<Array<ElementStatusFilterInput>>;
  project?: InputMaybe<ProjectFilterInput>;
  projectId?: InputMaybe<ComparableInt32OperationFilterInput>;
  status?: InputMaybe<StatusEnumOperationFilterInput>;
  updatedAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  userId?: InputMaybe<StringOperationFilterInput>;
};

export type ElementStatusSortInput = {
  createdAt?: InputMaybe<SortEnumType>;
  date?: InputMaybe<SortEnumType>;
  element?: InputMaybe<ElementSortInput>;
  elementId?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  project?: InputMaybe<ProjectSortInput>;
  projectId?: InputMaybe<SortEnumType>;
  status?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
  userId?: InputMaybe<SortEnumType>;
};

export type ElementTerm = {
  __typename?: 'ElementTerm';
  createdAt: Scalars['DateTime'];
  element: Element;
  elementId: Scalars['Int'];
  groupTerm?: Maybe<GroupTerm>;
  groupTermId?: Maybe<Scalars['Int']>;
  plannedFinish?: Maybe<Scalars['DateTime']>;
  plannedFinishBP?: Maybe<Scalars['DateTime']>;
  plannedStart?: Maybe<Scalars['DateTime']>;
  plannedStartBP?: Maybe<Scalars['DateTime']>;
  realFinish?: Maybe<Scalars['DateTime']>;
  realStart?: Maybe<Scalars['DateTime']>;
  updatedAt: Scalars['DateTime'];
};

export type ElementTermFilterInput = {
  and?: InputMaybe<Array<ElementTermFilterInput>>;
  createdAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  element?: InputMaybe<ElementFilterInput>;
  elementId?: InputMaybe<ComparableInt32OperationFilterInput>;
  groupTerm?: InputMaybe<GroupTermFilterInput>;
  groupTermId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  or?: InputMaybe<Array<ElementTermFilterInput>>;
  plannedFinish?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  plannedFinishBP?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  plannedStart?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  plannedStartBP?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  realFinish?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  realStart?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  updatedAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
};

export type ElementTermSortInput = {
  createdAt?: InputMaybe<SortEnumType>;
  element?: InputMaybe<ElementSortInput>;
  elementId?: InputMaybe<SortEnumType>;
  groupTerm?: InputMaybe<GroupTermSortInput>;
  groupTermId?: InputMaybe<SortEnumType>;
  plannedFinish?: InputMaybe<SortEnumType>;
  plannedFinishBP?: InputMaybe<SortEnumType>;
  plannedStart?: InputMaybe<SortEnumType>;
  plannedStartBP?: InputMaybe<SortEnumType>;
  realFinish?: InputMaybe<SortEnumType>;
  realStart?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
};

export type Element_ElementsTimeEvidence = {
  __typename?: 'Element_ElementsTimeEvidence';
  createdAt: Scalars['DateTime'];
  element: Element;
  elementId: Scalars['Int'];
  elementsTimeEvidence: ElementsTimeEvidence;
  elementsTimeEvidenceId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type Element_ElementsTimeEvidenceFilterInput = {
  and?: InputMaybe<Array<Element_ElementsTimeEvidenceFilterInput>>;
  createdAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  element?: InputMaybe<ElementFilterInput>;
  elementId?: InputMaybe<ComparableInt32OperationFilterInput>;
  elementsTimeEvidence?: InputMaybe<ElementsTimeEvidenceFilterInput>;
  elementsTimeEvidenceId?: InputMaybe<ComparableInt32OperationFilterInput>;
  or?: InputMaybe<Array<Element_ElementsTimeEvidenceFilterInput>>;
  updatedAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
};

export type ElementsTimeEvidence = {
  __typename?: 'ElementsTimeEvidence';
  createdAt: Scalars['DateTime'];
  crew: Crew;
  crewId: Scalars['Int'];
  date: Scalars['DateTime'];
  elementElementsTimeEvidence: Array<Element_ElementsTimeEvidence>;
  elements: Array<Element>;
  id: Scalars['Int'];
  project: Project;
  projectId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
  workedTime: Scalars['Decimal'];
};

export type ElementsTimeEvidenceFilterInput = {
  and?: InputMaybe<Array<ElementsTimeEvidenceFilterInput>>;
  createdAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  crew?: InputMaybe<CrewFilterInput>;
  crewId?: InputMaybe<ComparableInt32OperationFilterInput>;
  date?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  elementElementsTimeEvidence?: InputMaybe<ListFilterInputTypeOfElement_ElementsTimeEvidenceFilterInput>;
  elements?: InputMaybe<ListFilterInputTypeOfElementFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  or?: InputMaybe<Array<ElementsTimeEvidenceFilterInput>>;
  project?: InputMaybe<ProjectFilterInput>;
  projectId?: InputMaybe<ComparableInt32OperationFilterInput>;
  updatedAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  userId?: InputMaybe<StringOperationFilterInput>;
  workedTime?: InputMaybe<ComparableDecimalOperationFilterInput>;
};

export type ElementsTimeEvidenceSortInput = {
  createdAt?: InputMaybe<SortEnumType>;
  crew?: InputMaybe<CrewSortInput>;
  crewId?: InputMaybe<SortEnumType>;
  date?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  project?: InputMaybe<ProjectSortInput>;
  projectId?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
  userId?: InputMaybe<SortEnumType>;
  workedTime?: InputMaybe<SortEnumType>;
};

export type Entity = {
  __typename?: 'Entity';
  id?: Maybe<Scalars['Int']>;
};

export type EntityInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type GetAppInput = {
  id: Scalars['Int'];
};

export type GetClaimByIdInput = {
  appId: Scalars['Int'];
  projectId: Scalars['Int'];
  userId: Scalars['String'];
};

export type GetClaimsByUserIdInput = {
  userId: Scalars['String'];
};

export type GroupTerm = {
  __typename?: 'GroupTerm';
  crane?: Maybe<Crane>;
  craneId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  level?: Maybe<Level>;
  levelId?: Maybe<Scalars['Int']>;
  plannedFinish?: Maybe<Scalars['DateTime']>;
  plannedFinishBP?: Maybe<Scalars['DateTime']>;
  plannedStart?: Maybe<Scalars['DateTime']>;
  plannedStartBP?: Maybe<Scalars['DateTime']>;
  project: Project;
  projectId: Scalars['Int'];
  realFinish?: Maybe<Scalars['DateTime']>;
  realStart?: Maybe<Scalars['DateTime']>;
  terms: Array<ElementTerm>;
  updatedAt: Scalars['DateTime'];
  vertical: VerticalEnum;
};

export type GroupTermFilterInput = {
  and?: InputMaybe<Array<GroupTermFilterInput>>;
  crane?: InputMaybe<CraneFilterInput>;
  craneId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  createdAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  level?: InputMaybe<LevelFilterInput>;
  levelId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  or?: InputMaybe<Array<GroupTermFilterInput>>;
  plannedFinish?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  plannedFinishBP?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  plannedStart?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  plannedStartBP?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  project?: InputMaybe<ProjectFilterInput>;
  projectId?: InputMaybe<ComparableInt32OperationFilterInput>;
  realFinish?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  realStart?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  terms?: InputMaybe<ListFilterInputTypeOfElementTermFilterInput>;
  updatedAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  vertical?: InputMaybe<VerticalEnumOperationFilterInput>;
};

export type GroupTermSortInput = {
  crane?: InputMaybe<CraneSortInput>;
  craneId?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  level?: InputMaybe<LevelSortInput>;
  levelId?: InputMaybe<SortEnumType>;
  plannedFinish?: InputMaybe<SortEnumType>;
  plannedFinishBP?: InputMaybe<SortEnumType>;
  plannedStart?: InputMaybe<SortEnumType>;
  plannedStartBP?: InputMaybe<SortEnumType>;
  project?: InputMaybe<ProjectSortInput>;
  projectId?: InputMaybe<SortEnumType>;
  realFinish?: InputMaybe<SortEnumType>;
  realStart?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
  vertical?: InputMaybe<SortEnumType>;
};

export type GroupedOtherWorkTimeEvidence = {
  __typename?: 'GroupedOtherWorkTimeEvidence';
  createdAt: Scalars['DateTime'];
  crew: Crew;
  crewId: Scalars['Int'];
  crewType: CrewTypeEnum;
  date: Scalars['DateTime'];
  id: Scalars['Int'];
  level: Level;
  levelId: Scalars['Int'];
  otherWorksTimeEvidences: Array<OtherWorksTimeEvidence>;
  project: Project;
  projectId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type GroupedOtherWorkTimeEvidenceFilterInput = {
  and?: InputMaybe<Array<GroupedOtherWorkTimeEvidenceFilterInput>>;
  createdAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  crew?: InputMaybe<CrewFilterInput>;
  crewId?: InputMaybe<ComparableInt32OperationFilterInput>;
  crewType?: InputMaybe<CrewTypeEnumOperationFilterInput>;
  date?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  level?: InputMaybe<LevelFilterInput>;
  levelId?: InputMaybe<ComparableInt32OperationFilterInput>;
  or?: InputMaybe<Array<GroupedOtherWorkTimeEvidenceFilterInput>>;
  otherWorksTimeEvidences?: InputMaybe<ListFilterInputTypeOfOtherWorksTimeEvidenceFilterInput>;
  project?: InputMaybe<ProjectFilterInput>;
  projectId?: InputMaybe<ComparableInt32OperationFilterInput>;
  updatedAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
};

export type GroupedOtherWorkTimeEvidenceSortInput = {
  createdAt?: InputMaybe<SortEnumType>;
  crew?: InputMaybe<CrewSortInput>;
  crewId?: InputMaybe<SortEnumType>;
  crewType?: InputMaybe<SortEnumType>;
  date?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  level?: InputMaybe<LevelSortInput>;
  levelId?: InputMaybe<SortEnumType>;
  project?: InputMaybe<ProjectSortInput>;
  projectId?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
};

export type KeyValuePairOfStringAndParsedValue = {
  __typename?: 'KeyValuePairOfStringAndParsedValue';
  key: Scalars['String'];
  value: ParsedValue;
};

export type Level = {
  __typename?: 'Level';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  models: Array<BimModel>;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type LevelFilterInput = {
  and?: InputMaybe<Array<LevelFilterInput>>;
  createdAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  models?: InputMaybe<ListFilterInputTypeOfBimModelFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<LevelFilterInput>>;
  updatedAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
};

export type LevelSortInput = {
  createdAt?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
};

export type ListAppEnumOperationFilterInput = {
  all?: InputMaybe<AppEnumOperationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<AppEnumOperationFilterInput>;
  some?: InputMaybe<AppEnumOperationFilterInput>;
};

export type ListAppModulesEnumOperationFilterInput = {
  all?: InputMaybe<AppModulesEnumOperationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<AppModulesEnumOperationFilterInput>;
  some?: InputMaybe<AppModulesEnumOperationFilterInput>;
};

export type ListFilterInputTypeOfBimModelFilterInput = {
  all?: InputMaybe<BimModelFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<BimModelFilterInput>;
  some?: InputMaybe<BimModelFilterInput>;
};

export type ListFilterInputTypeOfBimModel_CraneFilterInput = {
  all?: InputMaybe<BimModel_CraneFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<BimModel_CraneFilterInput>;
  some?: InputMaybe<BimModel_CraneFilterInput>;
};

export type ListFilterInputTypeOfBimModel_LevelFilterInput = {
  all?: InputMaybe<BimModel_LevelFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<BimModel_LevelFilterInput>;
  some?: InputMaybe<BimModel_LevelFilterInput>;
};

export type ListFilterInputTypeOfCommentaryElementFilterInput = {
  all?: InputMaybe<CommentaryElementFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<CommentaryElementFilterInput>;
  some?: InputMaybe<CommentaryElementFilterInput>;
};

export type ListFilterInputTypeOfCraneFilterInput = {
  all?: InputMaybe<CraneFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<CraneFilterInput>;
  some?: InputMaybe<CraneFilterInput>;
};

export type ListFilterInputTypeOfCrewSummaryFilterInput = {
  all?: InputMaybe<CrewSummaryFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<CrewSummaryFilterInput>;
  some?: InputMaybe<CrewSummaryFilterInput>;
};

export type ListFilterInputTypeOfCustomParamProjectFilterInput = {
  all?: InputMaybe<CustomParamProjectFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<CustomParamProjectFilterInput>;
  some?: InputMaybe<CustomParamProjectFilterInput>;
};

export type ListFilterInputTypeOfCustomParamValueFilterInput = {
  all?: InputMaybe<CustomParamValueFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<CustomParamValueFilterInput>;
  some?: InputMaybe<CustomParamValueFilterInput>;
};

export type ListFilterInputTypeOfCustomParamsFilterInput = {
  all?: InputMaybe<CustomParamsFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<CustomParamsFilterInput>;
  some?: InputMaybe<CustomParamsFilterInput>;
};

export type ListFilterInputTypeOfDelayCauseFilterInput = {
  all?: InputMaybe<DelayCauseFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<DelayCauseFilterInput>;
  some?: InputMaybe<DelayCauseFilterInput>;
};

export type ListFilterInputTypeOfDelayFilterInput = {
  all?: InputMaybe<DelayFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<DelayFilterInput>;
  some?: InputMaybe<DelayFilterInput>;
};

export type ListFilterInputTypeOfDelay_DelayCauseFilterInput = {
  all?: InputMaybe<Delay_DelayCauseFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<Delay_DelayCauseFilterInput>;
  some?: InputMaybe<Delay_DelayCauseFilterInput>;
};

export type ListFilterInputTypeOfElementFilterInput = {
  all?: InputMaybe<ElementFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<ElementFilterInput>;
  some?: InputMaybe<ElementFilterInput>;
};

export type ListFilterInputTypeOfElementStatusFilterInput = {
  all?: InputMaybe<ElementStatusFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<ElementStatusFilterInput>;
  some?: InputMaybe<ElementStatusFilterInput>;
};

export type ListFilterInputTypeOfElementTermFilterInput = {
  all?: InputMaybe<ElementTermFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<ElementTermFilterInput>;
  some?: InputMaybe<ElementTermFilterInput>;
};

export type ListFilterInputTypeOfElement_ElementsTimeEvidenceFilterInput = {
  all?: InputMaybe<Element_ElementsTimeEvidenceFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<Element_ElementsTimeEvidenceFilterInput>;
  some?: InputMaybe<Element_ElementsTimeEvidenceFilterInput>;
};

export type ListFilterInputTypeOfElementsTimeEvidenceFilterInput = {
  all?: InputMaybe<ElementsTimeEvidenceFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<ElementsTimeEvidenceFilterInput>;
  some?: InputMaybe<ElementsTimeEvidenceFilterInput>;
};

export type ListFilterInputTypeOfLevelFilterInput = {
  all?: InputMaybe<LevelFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<LevelFilterInput>;
  some?: InputMaybe<LevelFilterInput>;
};

export type ListFilterInputTypeOfOtherWorksTimeEvidenceFilterInput = {
  all?: InputMaybe<OtherWorksTimeEvidenceFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<OtherWorksTimeEvidenceFilterInput>;
  some?: InputMaybe<OtherWorksTimeEvidenceFilterInput>;
};

export type ListFilterInputTypeOfProjectFilterInput = {
  all?: InputMaybe<ProjectFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<ProjectFilterInput>;
  some?: InputMaybe<ProjectFilterInput>;
};

export type ListFilterInputTypeOfProjectLevelCraneFilterInput = {
  all?: InputMaybe<ProjectLevelCraneFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<ProjectLevelCraneFilterInput>;
  some?: InputMaybe<ProjectLevelCraneFilterInput>;
};

export type ListFilterInputTypeOfWorkerFilterInput = {
  all?: InputMaybe<WorkerFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<WorkerFilterInput>;
  some?: InputMaybe<WorkerFilterInput>;
};

export type ListFilterInputTypeOfWorkerTimeEvidenceFilterInput = {
  all?: InputMaybe<WorkerTimeEvidenceFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<WorkerTimeEvidenceFilterInput>;
  some?: InputMaybe<WorkerTimeEvidenceFilterInput>;
};

export type ListStatusEnumOperationFilterInput = {
  all?: InputMaybe<StatusEnumOperationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<StatusEnumOperationFilterInput>;
  some?: InputMaybe<StatusEnumOperationFilterInput>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginPayload = {
  __typename?: 'LoginPayload';
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createApp: AppDto;
  createBimModel?: Maybe<BimModel>;
  createCommentaryElement?: Maybe<CommentaryElement>;
  createCrane?: Maybe<Crane>;
  createCrew?: Maybe<Crew>;
  createCrewSummary?: Maybe<CrewSummary>;
  createCustomParam?: Maybe<CustomParams>;
  createCustomParamProject?: Maybe<CustomParamProject>;
  createDelay?: Maybe<Delay>;
  createDelayCause?: Maybe<DelayCause>;
  createElement?: Maybe<Element>;
  createElementStatus?: Maybe<ElementStatus>;
  createElementTerm?: Maybe<ElementTerm>;
  createElementsTimeEvidence?: Maybe<ElementsTimeEvidence>;
  createGroupTerm?: Maybe<GroupTerm>;
  createGroupedOtherWorkTimeEvidence?: Maybe<GroupedOtherWorkTimeEvidence>;
  createLevel?: Maybe<Level>;
  createOtherWorkOption?: Maybe<OtherWorkOption>;
  createOtherWorksTimeEvidence?: Maybe<OtherWorksTimeEvidence>;
  createProject?: Maybe<Project>;
  createWorker?: Maybe<Worker>;
  createWorkerTimeEvidence?: Maybe<WorkerTimeEvidence>;
  deleteBimModel: BimModel;
  deleteCommentaryElement?: Maybe<CommentaryElement>;
  deleteCrane: Crane;
  deleteCrew: Entity;
  deleteCrewSummary: CrewSummary;
  deleteCustomParam?: Maybe<CustomParams>;
  deleteCustomParamProject?: Maybe<CustomParamProject>;
  deleteDelay: Delay;
  deleteDelayCause: DelayCause;
  deleteElement: Element;
  deleteElementStatus: ElementStatus;
  deleteElementTerm: ElementTerm;
  deleteElementsTimeEvidence: ElementsTimeEvidence;
  deleteGroupTerm: GroupTerm;
  deleteGroupedOtherWorkTimeEvidence: GroupedOtherWorkTimeEvidence;
  deleteLevel: Level;
  deleteOtherWorkOption: OtherWorkOption;
  deleteOtherWorksTimeEvidence: OtherWorksTimeEvidence;
  deleteProject: Project;
  deleteWorker: Worker;
  deleteWorkerTimeEvidence: WorkerTimeEvidence;
  importData: UploadImportedPayload;
  login: LoginPayload;
  passwordReset: Scalars['Boolean'];
  register: RegisterPayload;
  updateBimModel?: Maybe<BimModel>;
  updateCommentaryElement?: Maybe<CommentaryElement>;
  updateCrane?: Maybe<Crane>;
  updateCrew?: Maybe<Crew>;
  updateCrewSummary?: Maybe<CrewSummary>;
  updateCustomParam: Array<CustomParams>;
  updateDelay?: Maybe<Delay>;
  updateDelayCause?: Maybe<DelayCause>;
  updateElement?: Maybe<Element>;
  updateElementStatus?: Maybe<ElementStatus>;
  updateElementTerm?: Maybe<ElementTerm>;
  updateElementsTimeEvidence?: Maybe<ElementsTimeEvidence>;
  updateGroupTerm?: Maybe<GroupTerm>;
  updateGroupedOtherWorkTimeEvidence?: Maybe<GroupedOtherWorkTimeEvidence>;
  updateLevel?: Maybe<Level>;
  updateOtherWorkOption?: Maybe<OtherWorkOption>;
  updateOtherWorksTimeEvidence?: Maybe<OtherWorksTimeEvidence>;
  updateProject?: Maybe<Project>;
  updateWorker?: Maybe<Worker>;
  updateWorkerTimeEvidence?: Maybe<WorkerTimeEvidence>;
  validateData: UploadValidatePayload;
};


export type MutationCreateAppArgs = {
  input: AddAppInput;
};


export type MutationCreateBimModelArgs = {
  input: CreateBimModelDtoInput;
};


export type MutationCreateCommentaryElementArgs = {
  input: CreateCommentaryElementDtoInput;
};


export type MutationCreateCraneArgs = {
  input: CreateCraneDtoInput;
};


export type MutationCreateCrewArgs = {
  input: CreateCrewDtoInput;
};


export type MutationCreateCrewSummaryArgs = {
  input: CreateCrewSummaryDtoInput;
};


export type MutationCreateCustomParamArgs = {
  input: CreateCustomParamDtoInput;
};


export type MutationCreateCustomParamProjectArgs = {
  input: CreateCustomParamProjectDtoInput;
};


export type MutationCreateDelayArgs = {
  input: CreateDelayDtoInput;
};


export type MutationCreateDelayCauseArgs = {
  input: CreateDelayCauseDtoInput;
};


export type MutationCreateElementArgs = {
  input: CreateElementDtoInput;
};


export type MutationCreateElementStatusArgs = {
  input: CreateElementStatusDtoInput;
};


export type MutationCreateElementTermArgs = {
  input: CreateElementTermDtoInput;
};


export type MutationCreateElementsTimeEvidenceArgs = {
  input: CreateElementsTimeEvidenceDtoInput;
};


export type MutationCreateGroupTermArgs = {
  input: CreateGroupTermDtoInput;
};


export type MutationCreateGroupedOtherWorkTimeEvidenceArgs = {
  input: CreateGroupedOtherWorkTimeEvidenceDtoInput;
};


export type MutationCreateLevelArgs = {
  input: CreateLevelDtoInput;
};


export type MutationCreateOtherWorkOptionArgs = {
  input: CreateOtherWorkOptionDtoInput;
};


export type MutationCreateOtherWorksTimeEvidenceArgs = {
  input: CreateOtherWorksTimeEvidenceDtoInput;
};


export type MutationCreateProjectArgs = {
  input: CreateProjectDtoInput;
};


export type MutationCreateWorkerArgs = {
  input: CreateWorkerDtoInput;
};


export type MutationCreateWorkerTimeEvidenceArgs = {
  input: CreateWorkerTimeEvidenceDtoInput;
};


export type MutationDeleteBimModelArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteCommentaryElementArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteCraneArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteCrewArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteCrewSummaryArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteCustomParamArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteCustomParamProjectArgs = {
  customParamsId: Scalars['Int'];
  projectId: Scalars['Int'];
};


export type MutationDeleteDelayArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteDelayCauseArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteElementArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteElementStatusArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteElementTermArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteElementsTimeEvidenceArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteGroupTermArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteGroupedOtherWorkTimeEvidenceArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteLevelArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteOtherWorkOptionArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteOtherWorksTimeEvidenceArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteWorkerArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteWorkerTimeEvidenceArgs = {
  id: Scalars['Int'];
};


export type MutationImportDataArgs = {
  input: UploadInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationPasswordResetArgs = {
  input: PasswordResetInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationUpdateBimModelArgs = {
  id: Scalars['Int'];
  input: UpdateBimModelDtoInput;
};


export type MutationUpdateCommentaryElementArgs = {
  id: Scalars['Int'];
  input: UpdateCommentaryElementDtoInput;
};


export type MutationUpdateCraneArgs = {
  id: Scalars['Int'];
  input: UpdateCraneDtoInput;
};


export type MutationUpdateCrewArgs = {
  id: Scalars['Int'];
  input: UpdateCrewDtoInput;
};


export type MutationUpdateCrewSummaryArgs = {
  id: Scalars['Int'];
  input: UpdateCrewSummaryDtoInput;
};


export type MutationUpdateCustomParamArgs = {
  id: Scalars['Int'];
  input: UpdateCustomParamDtoInput;
};


export type MutationUpdateDelayArgs = {
  id: Scalars['Int'];
  input: UpdateDelayDtoInput;
};


export type MutationUpdateDelayCauseArgs = {
  id: Scalars['Int'];
  input: UpdateDelayCauseDtoInput;
};


export type MutationUpdateElementArgs = {
  id: Scalars['Int'];
  input: UpdateElementDtoInput;
};


export type MutationUpdateElementStatusArgs = {
  id: Scalars['Int'];
  input: UpdateElementStatusDtoInput;
};


export type MutationUpdateElementTermArgs = {
  id: Scalars['Int'];
  input: UpdateElementTermDtoInput;
};


export type MutationUpdateElementsTimeEvidenceArgs = {
  id: Scalars['Int'];
  input: UpdateElementsTimeEvidenceDtoInput;
};


export type MutationUpdateGroupTermArgs = {
  id: Scalars['Int'];
  input: UpdateGroupTermDtoInput;
};


export type MutationUpdateGroupedOtherWorkTimeEvidenceArgs = {
  id: Scalars['Int'];
  input: UpdateGroupedOtherWorkTimeEvidenceDtoInput;
};


export type MutationUpdateLevelArgs = {
  id: Scalars['Int'];
  input: UpdateLevelDtoInput;
};


export type MutationUpdateOtherWorkOptionArgs = {
  id: Scalars['Int'];
  input: UpdateOtherWorkOptionDtoInput;
};


export type MutationUpdateOtherWorksTimeEvidenceArgs = {
  id: Scalars['Int'];
  input: UpdateOtherWorksTimeEvidenceDtoInput;
};


export type MutationUpdateProjectArgs = {
  id: Scalars['Int'];
  input: UpdateProjectDtoInput;
};


export type MutationUpdateWorkerArgs = {
  id: Scalars['Int'];
  input: UpdateWorkerDtoInput;
};


export type MutationUpdateWorkerTimeEvidenceArgs = {
  id: Scalars['Int'];
  input: UpdateWorkerTimeEvidenceDtoInput;
};


export type MutationValidateDataArgs = {
  input: UploadInput;
};

export type NullableOfCrewWorkTypeEnumOperationFilterInput = {
  eq?: InputMaybe<CrewWorkTypeEnum>;
  in?: InputMaybe<Array<InputMaybe<CrewWorkTypeEnum>>>;
  neq?: InputMaybe<CrewWorkTypeEnum>;
  nin?: InputMaybe<Array<InputMaybe<CrewWorkTypeEnum>>>;
};

export type NullableOfVerticalEnumOperationFilterInput = {
  eq?: InputMaybe<VerticalEnum>;
  in?: InputMaybe<Array<InputMaybe<VerticalEnum>>>;
  neq?: InputMaybe<VerticalEnum>;
  nin?: InputMaybe<Array<InputMaybe<VerticalEnum>>>;
};

export type OtherWorkOption = {
  __typename?: 'OtherWorkOption';
  createdAt: Scalars['DateTime'];
  crewType: CrewTypeEnum;
  crewWorkType: CrewWorkTypeEnum;
  id: Scalars['Int'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type OtherWorkOptionFilterInput = {
  and?: InputMaybe<Array<OtherWorkOptionFilterInput>>;
  createdAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  crewType?: InputMaybe<CrewTypeEnumOperationFilterInput>;
  crewWorkType?: InputMaybe<CrewWorkTypeEnumOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<OtherWorkOptionFilterInput>>;
  updatedAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
};

export type OtherWorkOptionSortInput = {
  createdAt?: InputMaybe<SortEnumType>;
  crewType?: InputMaybe<SortEnumType>;
  crewWorkType?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
};

export enum OtherWorkTypeEnum {
  Additional = 'ADDITIONAL',
  Helper = 'HELPER'
}

export type OtherWorkTypeEnumOperationFilterInput = {
  eq?: InputMaybe<OtherWorkTypeEnum>;
  in?: InputMaybe<Array<OtherWorkTypeEnum>>;
  neq?: InputMaybe<OtherWorkTypeEnum>;
  nin?: InputMaybe<Array<OtherWorkTypeEnum>>;
};

export type OtherWorksTimeEvidence = {
  __typename?: 'OtherWorksTimeEvidence';
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  groupedOtherWorkTimeEvidence?: Maybe<GroupedOtherWorkTimeEvidence>;
  groupedOtherWorkTimeEvidenceId?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  otherWorkOption: OtherWorkOption;
  otherWorkOptionId: Scalars['Int'];
  otherWorkType: OtherWorkTypeEnum;
  type: CrewWorkTypeEnum;
  updatedAt: Scalars['DateTime'];
  workedTime: Scalars['Decimal'];
};

export type OtherWorksTimeEvidenceFilterInput = {
  and?: InputMaybe<Array<OtherWorksTimeEvidenceFilterInput>>;
  createdAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  groupedOtherWorkTimeEvidence?: InputMaybe<GroupedOtherWorkTimeEvidenceFilterInput>;
  groupedOtherWorkTimeEvidenceId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  or?: InputMaybe<Array<OtherWorksTimeEvidenceFilterInput>>;
  otherWorkOption?: InputMaybe<OtherWorkOptionFilterInput>;
  otherWorkOptionId?: InputMaybe<ComparableInt32OperationFilterInput>;
  otherWorkType?: InputMaybe<OtherWorkTypeEnumOperationFilterInput>;
  type?: InputMaybe<CrewWorkTypeEnumOperationFilterInput>;
  updatedAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  workedTime?: InputMaybe<ComparableDecimalOperationFilterInput>;
};

export type OtherWorksTimeEvidenceSortInput = {
  createdAt?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  groupedOtherWorkTimeEvidence?: InputMaybe<GroupedOtherWorkTimeEvidenceSortInput>;
  groupedOtherWorkTimeEvidenceId?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  otherWorkOption?: InputMaybe<OtherWorkOptionSortInput>;
  otherWorkOptionId?: InputMaybe<SortEnumType>;
  otherWorkType?: InputMaybe<SortEnumType>;
  type?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
  workedTime?: InputMaybe<SortEnumType>;
};

export type ParsedValue = {
  __typename?: 'ParsedValue';
  errorMessage?: Maybe<Scalars['String']>;
  isValid: Scalars['Boolean'];
  value?: Maybe<Scalars['Any']>;
};

export type PasswordResetInput = {
  confirmPassword: Scalars['String'];
  id: Scalars['String'];
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type Project = {
  __typename?: 'Project';
  centralScheduleSync: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  customParamProject: Array<CustomParamProject>;
  customParams: Array<CustomParams>;
  id: Scalars['Int'];
  metodologyCode?: Maybe<Scalars['String']>;
  models: Array<BimModel>;
  name: Scalars['String'];
  projectLevelCranes: Array<ProjectLevelCrane>;
  supportedAppModules: Array<AppModulesEnum>;
  supportedApps: Array<AppEnum>;
  supportedStatuses: Array<StatusEnum>;
  updatedAt: Scalars['DateTime'];
  webconCode?: Maybe<Scalars['String']>;
};

export type ProjectCount = {
  __typename?: 'ProjectCount';
  count: Scalars['Int'];
};

export type ProjectFilterInput = {
  and?: InputMaybe<Array<ProjectFilterInput>>;
  centralScheduleSync?: InputMaybe<BooleanOperationFilterInput>;
  createdAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  customParamProject?: InputMaybe<ListFilterInputTypeOfCustomParamProjectFilterInput>;
  customParams?: InputMaybe<ListFilterInputTypeOfCustomParamsFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  metodologyCode?: InputMaybe<StringOperationFilterInput>;
  models?: InputMaybe<ListFilterInputTypeOfBimModelFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<ProjectFilterInput>>;
  projectLevelCranes?: InputMaybe<ListFilterInputTypeOfProjectLevelCraneFilterInput>;
  supportedAppModules?: InputMaybe<ListAppModulesEnumOperationFilterInput>;
  supportedApps?: InputMaybe<ListAppEnumOperationFilterInput>;
  supportedStatuses?: InputMaybe<ListStatusEnumOperationFilterInput>;
  updatedAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  webconCode?: InputMaybe<StringOperationFilterInput>;
};

export type ProjectLevelCrane = {
  __typename?: 'ProjectLevelCrane';
  crane: Crane;
  craneId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  level: Level;
  levelId: Scalars['Int'];
  project: Project;
  projectId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type ProjectLevelCraneFilterInput = {
  and?: InputMaybe<Array<ProjectLevelCraneFilterInput>>;
  crane?: InputMaybe<CraneFilterInput>;
  craneId?: InputMaybe<ComparableInt32OperationFilterInput>;
  createdAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  level?: InputMaybe<LevelFilterInput>;
  levelId?: InputMaybe<ComparableInt32OperationFilterInput>;
  or?: InputMaybe<Array<ProjectLevelCraneFilterInput>>;
  project?: InputMaybe<ProjectFilterInput>;
  projectId?: InputMaybe<ComparableInt32OperationFilterInput>;
  updatedAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
};

export type ProjectRangeDtoInput = {
  craneId: Scalars['Int'];
  levelId: Scalars['Int'];
};

export type ProjectSortInput = {
  centralScheduleSync?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  metodologyCode?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
  webconCode?: InputMaybe<SortEnumType>;
};

export type Query = {
  __typename?: 'Query';
  app: AppPayload;
  apps: Array<AppPayload>;
  appsAll: Array<AppPayload>;
  bimModel?: Maybe<BimModel>;
  bimModels: Array<BimModel>;
  claim: ClaimPayload;
  claims: Array<ClaimPayload>;
  commentaryElement?: Maybe<CommentaryElement>;
  commentaryElements: Array<CommentaryElement>;
  /** Get particural crane by ID */
  crane?: Maybe<Crane>;
  /** Get collection of cranes */
  cranes: Array<Crane>;
  crew?: Maybe<Crew>;
  crewSummaries: Array<CrewSummary>;
  crewSummary?: Maybe<CrewSummary>;
  crews: Array<Crew>;
  customParam?: Maybe<CustomParams>;
  customParamProject?: Maybe<CustomParamProject>;
  customParamProjects: Array<CustomParamProject>;
  customParams: Array<CustomParams>;
  delay?: Maybe<Delay>;
  delayCause?: Maybe<DelayCause>;
  delayCauses: Array<DelayCause>;
  delays: Array<Delay>;
  element?: Maybe<Element>;
  elementStatues: Array<ElementStatus>;
  elementStatus?: Maybe<ElementStatus>;
  elementTerm?: Maybe<ElementTerm>;
  elementTerms: Array<ElementTerm>;
  elements: Array<Element>;
  elementsTimeEvidence?: Maybe<ElementsTimeEvidence>;
  elementsTimeEvidences: Array<ElementsTimeEvidence>;
  groupTerm?: Maybe<GroupTerm>;
  groupTerms: Array<GroupTerm>;
  groupedOtherWorkTimeEvidence?: Maybe<GroupedOtherWorkTimeEvidence>;
  groupedOtherWorkTimeEvidences: Array<GroupedOtherWorkTimeEvidence>;
  /** get level */
  level?: Maybe<Level>;
  levels: Array<Level>;
  me: UserPayload;
  myClaims: Array<ClaimPayload>;
  myProjects: Array<Project>;
  otherWorkOption?: Maybe<OtherWorkOption>;
  otherWorkOptions: Array<OtherWorkOption>;
  otherWorksTimeEvidence?: Maybe<OtherWorksTimeEvidence>;
  otherWorksTimeEvidences: Array<OtherWorksTimeEvidence>;
  project?: Maybe<Project>;
  projects: Array<Project>;
  user: UserPayload;
  worker?: Maybe<Worker>;
  workerTimeEvidence?: Maybe<WorkerTimeEvidence>;
  workerTimeEvidences: Array<WorkerTimeEvidence>;
  workers: Array<Worker>;
};


export type QueryAppArgs = {
  input: GetAppInput;
};


export type QueryAppsArgs = {
  inputs: Array<GetAppInput>;
};


export type QueryBimModelArgs = {
  id: Scalars['Int'];
};


export type QueryBimModelsArgs = {
  order?: InputMaybe<Array<BimModelSortInput>>;
  where?: InputMaybe<BimModelFilterInput>;
};


export type QueryClaimArgs = {
  input: GetClaimByIdInput;
};


export type QueryClaimsArgs = {
  input: GetClaimsByUserIdInput;
};


export type QueryCommentaryElementArgs = {
  id: Scalars['Int'];
};


export type QueryCommentaryElementsArgs = {
  order?: InputMaybe<Array<CommentaryElementSortInput>>;
  where?: InputMaybe<CommentaryElementFilterInput>;
};


export type QueryCraneArgs = {
  id: Scalars['Int'];
};


export type QueryCranesArgs = {
  order?: InputMaybe<Array<CraneSortInput>>;
  where?: InputMaybe<CraneFilterInput>;
};


export type QueryCrewArgs = {
  id: Scalars['Int'];
};


export type QueryCrewSummariesArgs = {
  order?: InputMaybe<Array<CrewSummarySortInput>>;
  where?: InputMaybe<CrewSummaryFilterInput>;
};


export type QueryCrewSummaryArgs = {
  id: Scalars['Int'];
};


export type QueryCrewsArgs = {
  order?: InputMaybe<Array<CrewSortInput>>;
  where?: InputMaybe<CrewFilterInput>;
};


export type QueryCustomParamArgs = {
  id: Scalars['Int'];
};


export type QueryCustomParamProjectArgs = {
  customParamId: Scalars['Int'];
  projectId: Scalars['Int'];
};


export type QueryCustomParamProjectsArgs = {
  order?: InputMaybe<Array<CustomParamProjectSortInput>>;
  where?: InputMaybe<CustomParamProjectFilterInput>;
};


export type QueryCustomParamsArgs = {
  order?: InputMaybe<Array<CustomParamsSortInput>>;
  where?: InputMaybe<CustomParamsFilterInput>;
};


export type QueryDelayArgs = {
  id: Scalars['Int'];
};


export type QueryDelayCauseArgs = {
  id: Scalars['Int'];
};


export type QueryDelayCausesArgs = {
  order?: InputMaybe<Array<DelayCauseSortInput>>;
  where?: InputMaybe<DelayCauseFilterInput>;
};


export type QueryDelaysArgs = {
  order?: InputMaybe<Array<DelaySortInput>>;
  where?: InputMaybe<DelayFilterInput>;
};


export type QueryElementArgs = {
  id: Scalars['Int'];
};


export type QueryElementStatuesArgs = {
  order?: InputMaybe<Array<ElementStatusSortInput>>;
  where?: InputMaybe<ElementStatusFilterInput>;
};


export type QueryElementStatusArgs = {
  id: Scalars['Int'];
};


export type QueryElementTermArgs = {
  id: Scalars['Int'];
};


export type QueryElementTermsArgs = {
  order?: InputMaybe<Array<ElementTermSortInput>>;
  where?: InputMaybe<ElementTermFilterInput>;
};


export type QueryElementsArgs = {
  order?: InputMaybe<Array<ElementSortInput>>;
  where?: InputMaybe<ElementFilterInput>;
};


export type QueryElementsTimeEvidenceArgs = {
  id: Scalars['Int'];
};


export type QueryElementsTimeEvidencesArgs = {
  order?: InputMaybe<Array<ElementsTimeEvidenceSortInput>>;
  where?: InputMaybe<ElementsTimeEvidenceFilterInput>;
};


export type QueryGroupTermArgs = {
  id: Scalars['Int'];
};


export type QueryGroupTermsArgs = {
  order?: InputMaybe<Array<GroupTermSortInput>>;
  where?: InputMaybe<GroupTermFilterInput>;
};


export type QueryGroupedOtherWorkTimeEvidenceArgs = {
  id: Scalars['Int'];
};


export type QueryGroupedOtherWorkTimeEvidencesArgs = {
  order?: InputMaybe<Array<GroupedOtherWorkTimeEvidenceSortInput>>;
  where?: InputMaybe<GroupedOtherWorkTimeEvidenceFilterInput>;
};


export type QueryLevelArgs = {
  id: Scalars['Int'];
};


export type QueryLevelsArgs = {
  order?: InputMaybe<Array<LevelSortInput>>;
  where?: InputMaybe<LevelFilterInput>;
};


export type QueryOtherWorkOptionArgs = {
  id: Scalars['Int'];
};


export type QueryOtherWorkOptionsArgs = {
  order?: InputMaybe<Array<OtherWorkOptionSortInput>>;
  where?: InputMaybe<OtherWorkOptionFilterInput>;
};


export type QueryOtherWorksTimeEvidenceArgs = {
  id: Scalars['Int'];
};


export type QueryOtherWorksTimeEvidencesArgs = {
  order?: InputMaybe<Array<OtherWorksTimeEvidenceSortInput>>;
  where?: InputMaybe<OtherWorksTimeEvidenceFilterInput>;
};


export type QueryProjectArgs = {
  id: Scalars['Int'];
};


export type QueryProjectsArgs = {
  order?: InputMaybe<Array<ProjectSortInput>>;
  where?: InputMaybe<ProjectFilterInput>;
};


export type QueryUserArgs = {
  input: UserInput;
};


export type QueryWorkerArgs = {
  id: Scalars['Int'];
};


export type QueryWorkerTimeEvidenceArgs = {
  id: Scalars['Int'];
};


export type QueryWorkerTimeEvidencesArgs = {
  order?: InputMaybe<Array<WorkerTimeEvidenceSortInput>>;
  where?: InputMaybe<WorkerTimeEvidenceFilterInput>;
};


export type QueryWorkersArgs = {
  order?: InputMaybe<Array<WorkerSortInput>>;
  where?: InputMaybe<WorkerFilterInput>;
};

export type RegisterInput = {
  confirmPassword: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterPayload = {
  __typename?: 'RegisterPayload';
  success: Scalars['Boolean'];
};

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum StatusEnum {
  Finished = 'FINISHED',
  InProgress = 'IN_PROGRESS'
}

export type StatusEnumOperationFilterInput = {
  eq?: InputMaybe<StatusEnum>;
  in?: InputMaybe<Array<StatusEnum>>;
  neq?: InputMaybe<StatusEnum>;
  nin?: InputMaybe<Array<StatusEnum>>;
};

export type StringOperationFilterInput = {
  and?: InputMaybe<Array<StringOperationFilterInput>>;
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  eq?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ncontains?: InputMaybe<Scalars['String']>;
  nendsWith?: InputMaybe<Scalars['String']>;
  neq?: InputMaybe<Scalars['String']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  nstartsWith?: InputMaybe<Scalars['String']>;
  or?: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type UpdateBimModelDtoInput = {
  cranes?: InputMaybe<Array<EntityInput>>;
  defaultViewName?: InputMaybe<Scalars['String']>;
  levels?: InputMaybe<Array<EntityInput>>;
  modelUrn?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  project?: InputMaybe<EntityInput>;
};

export type UpdateCommentaryElementDtoInput = {
  content?: InputMaybe<Scalars['String']>;
  element?: InputMaybe<EntityInput>;
  user?: InputMaybe<UserInput>;
};

export type UpdateCraneDtoInput = {
  name: Scalars['String'];
};

export type UpdateCrewDtoInput = {
  crewWorkType?: InputMaybe<CrewWorkTypeEnum>;
  name?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<EntityInput>;
  project?: InputMaybe<EntityInput>;
};

export type UpdateCrewSummaryDtoInput = {
  crew?: InputMaybe<EntityInput>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  project?: InputMaybe<EntityInput>;
  startDate?: InputMaybe<Scalars['DateTime']>;
  user?: InputMaybe<EntityInput>;
  workers?: InputMaybe<Array<EntityInput>>;
};

export type UpdateCustomParamDtoInput = {
  canBeNull?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  isCustom?: InputMaybe<Scalars['Boolean']>;
  key?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<CustomParamsDataTypes>;
};

export type UpdateDelayCauseDtoInput = {
  isMain?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<EntityInput>;
};

export type UpdateDelayDtoInput = {
  commentary?: InputMaybe<Scalars['String']>;
  crane?: InputMaybe<EntityInput>;
  date?: InputMaybe<Scalars['DateTime']>;
  delayCauses?: InputMaybe<Array<EntityInput>>;
  level?: InputMaybe<EntityInput>;
  project?: InputMaybe<EntityInput>;
  user?: InputMaybe<EntityInput>;
};

export type UpdateElementDtoInput = {
  area?: InputMaybe<Scalars['Decimal']>;
  bimModel?: InputMaybe<EntityInput>;
  crane?: InputMaybe<EntityInput>;
  details?: InputMaybe<Scalars['String']>;
  isPrefabricated?: InputMaybe<Scalars['Boolean']>;
  level?: InputMaybe<EntityInput>;
  project?: InputMaybe<EntityInput>;
  realisationMode?: InputMaybe<Scalars['String']>;
  revitId?: InputMaybe<Scalars['Int']>;
  rotationDay?: InputMaybe<Scalars['Int']>;
  runningMetre?: InputMaybe<Scalars['Decimal']>;
  vertical?: InputMaybe<VerticalEnum>;
  volume?: InputMaybe<Scalars['Decimal']>;
};

export type UpdateElementStatusDtoInput = {
  date?: InputMaybe<Scalars['DateTime']>;
  element?: InputMaybe<EntityInput>;
  project?: InputMaybe<EntityInput>;
  status?: InputMaybe<StatusEnum>;
  user?: InputMaybe<EntityInput>;
};

export type UpdateElementTermDtoInput = {
  plannedFinish?: InputMaybe<Scalars['DateTime']>;
  plannedFinishBP?: InputMaybe<Scalars['DateTime']>;
  plannedStart?: InputMaybe<Scalars['DateTime']>;
  plannedStartBP?: InputMaybe<Scalars['DateTime']>;
  realFinish?: InputMaybe<Scalars['DateTime']>;
  realStart?: InputMaybe<Scalars['DateTime']>;
};

export type UpdateElementsTimeEvidenceDtoInput = {
  crew?: InputMaybe<EntityInput>;
  date?: InputMaybe<Scalars['DateTime']>;
  elements?: InputMaybe<Array<EntityInput>>;
  project?: InputMaybe<EntityInput>;
  user?: InputMaybe<EntityInput>;
  workedTime?: InputMaybe<Scalars['Decimal']>;
};

export type UpdateGroupTermDtoInput = {
  crane?: InputMaybe<EntityInput>;
  level?: InputMaybe<EntityInput>;
  plannedFinish?: InputMaybe<Scalars['DateTime']>;
  plannedFinishBP?: InputMaybe<Scalars['DateTime']>;
  plannedStart?: InputMaybe<Scalars['DateTime']>;
  plannedStartBP?: InputMaybe<Scalars['DateTime']>;
  project?: InputMaybe<EntityInput>;
  realFinish?: InputMaybe<Scalars['DateTime']>;
  realStart?: InputMaybe<Scalars['DateTime']>;
  terms?: InputMaybe<Array<EntityInput>>;
  vertical?: InputMaybe<VerticalEnum>;
};

export type UpdateGroupedOtherWorkTimeEvidenceDtoInput = {
  crew?: InputMaybe<EntityInput>;
  crewType?: InputMaybe<CrewTypeEnum>;
  date?: InputMaybe<Scalars['DateTime']>;
  level?: InputMaybe<EntityInput>;
  project?: InputMaybe<EntityInput>;
};

export type UpdateLevelDtoInput = {
  name: Scalars['String'];
};

export type UpdateOtherWorkOptionDtoInput = {
  crewType?: InputMaybe<CrewTypeEnum>;
  crewWorkType?: InputMaybe<CrewWorkTypeEnum>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateOtherWorksTimeEvidenceDtoInput = {
  description?: InputMaybe<Scalars['String']>;
  groupedOtherWorkTimeEvidence?: InputMaybe<EntityInput>;
  otherWorkOption?: InputMaybe<EntityInput>;
  otherWorkType?: InputMaybe<OtherWorkTypeEnum>;
  type?: InputMaybe<CrewWorkTypeEnum>;
  workedTime?: InputMaybe<Scalars['Decimal']>;
};

export type UpdateProjectDtoInput = {
  centralScheduleSync?: InputMaybe<Scalars['Boolean']>;
  metodologyCode?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  projectRange?: InputMaybe<ProjectRangeDtoInput>;
  supportedAppModules?: InputMaybe<Array<AppModulesEnum>>;
  supportedApps?: InputMaybe<Array<AppEnum>>;
  supportedStatuses?: InputMaybe<Array<StatusEnum>>;
  webconCode?: InputMaybe<Scalars['String']>;
};

export type UpdateWorkerDtoInput = {
  crewWorkType?: InputMaybe<CrewWorkTypeEnum>;
  name?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<EntityInput>;
  warbudId?: InputMaybe<Scalars['String']>;
};

export type UpdateWorkerTimeEvidenceDtoInput = {
  crewSummary?: InputMaybe<EntityInput>;
  date?: InputMaybe<Scalars['DateTime']>;
  project?: InputMaybe<EntityInput>;
  user?: InputMaybe<EntityInput>;
  workedTime?: InputMaybe<Scalars['Decimal']>;
  worker?: InputMaybe<EntityInput>;
};

export type UploadImportedPayload = {
  __typename?: 'UploadImportedPayload';
  data: Scalars['Boolean'];
};

export type UploadInput = {
  appName: AppEnum;
  dataType: DataImportType;
  projectId: Scalars['Int'];
  value?: InputMaybe<Scalars['String']>;
};

export type UploadValidatePayload = {
  __typename?: 'UploadValidatePayload';
  data?: Maybe<Array<Maybe<Array<KeyValuePairOfStringAndParsedValue>>>>;
};

export type UserInput = {
  id: Scalars['String'];
};

export type UserPayload = {
  __typename?: 'UserPayload';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['String'];
  lastName: Scalars['String'];
};

export enum VerticalEnum {
  H = 'H',
  V = 'V'
}

export type VerticalEnumOperationFilterInput = {
  eq?: InputMaybe<VerticalEnum>;
  in?: InputMaybe<Array<VerticalEnum>>;
  neq?: InputMaybe<VerticalEnum>;
  nin?: InputMaybe<Array<VerticalEnum>>;
};

export type Worker = {
  __typename?: 'Worker';
  createdAt: Scalars['DateTime'];
  crewSummaries: Array<CrewSummary>;
  crewWorkType?: Maybe<CrewWorkTypeEnum>;
  id: Scalars['Int'];
  isHouseWorker: Scalars['Boolean'];
  name?: Maybe<Scalars['String']>;
  timeEvidences: Array<WorkerTimeEvidence>;
  updatedAt: Scalars['DateTime'];
  userId?: Maybe<Scalars['String']>;
  warbudId?: Maybe<Scalars['String']>;
};

export type WorkerFilterInput = {
  and?: InputMaybe<Array<WorkerFilterInput>>;
  createdAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  crewSummaries?: InputMaybe<ListFilterInputTypeOfCrewSummaryFilterInput>;
  crewWorkType?: InputMaybe<NullableOfCrewWorkTypeEnumOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isHouseWorker?: InputMaybe<BooleanOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<WorkerFilterInput>>;
  timeEvidences?: InputMaybe<ListFilterInputTypeOfWorkerTimeEvidenceFilterInput>;
  updatedAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  userId?: InputMaybe<StringOperationFilterInput>;
  warbudId?: InputMaybe<StringOperationFilterInput>;
};

export type WorkerSortInput = {
  createdAt?: InputMaybe<SortEnumType>;
  crewWorkType?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isHouseWorker?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
  userId?: InputMaybe<SortEnumType>;
  warbudId?: InputMaybe<SortEnumType>;
};

export type WorkerTimeEvidence = {
  __typename?: 'WorkerTimeEvidence';
  createdAt: Scalars['DateTime'];
  crewSummary: CrewSummary;
  crewSummaryId: Scalars['Int'];
  date: Scalars['DateTime'];
  id: Scalars['Int'];
  project: Project;
  projectId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
  workedTime: Scalars['Decimal'];
  worker: Worker;
  workerId: Scalars['Int'];
};

export type WorkerTimeEvidenceFilterInput = {
  and?: InputMaybe<Array<WorkerTimeEvidenceFilterInput>>;
  createdAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  crewSummary?: InputMaybe<CrewSummaryFilterInput>;
  crewSummaryId?: InputMaybe<ComparableInt32OperationFilterInput>;
  date?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  or?: InputMaybe<Array<WorkerTimeEvidenceFilterInput>>;
  project?: InputMaybe<ProjectFilterInput>;
  projectId?: InputMaybe<ComparableInt32OperationFilterInput>;
  updatedAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  userId?: InputMaybe<StringOperationFilterInput>;
  workedTime?: InputMaybe<ComparableDecimalOperationFilterInput>;
  worker?: InputMaybe<WorkerFilterInput>;
  workerId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type WorkerTimeEvidenceSortInput = {
  createdAt?: InputMaybe<SortEnumType>;
  crewSummary?: InputMaybe<CrewSummarySortInput>;
  crewSummaryId?: InputMaybe<SortEnumType>;
  date?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  project?: InputMaybe<ProjectSortInput>;
  projectId?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
  userId?: InputMaybe<SortEnumType>;
  workedTime?: InputMaybe<SortEnumType>;
  worker?: InputMaybe<WorkerSortInput>;
  workerId?: InputMaybe<SortEnumType>;
};
