import { E_TaskCode, E_TaskTypeToCode } from "@/enums/general.enums";

export function getTaskType(type: string) {
  switch (type) {
    case E_TaskCode.ALL_TASKS:
      return E_TaskTypeToCode[E_TaskCode.ALL_TASKS];
    case E_TaskCode.TO_DO:
      return E_TaskTypeToCode[E_TaskCode.TO_DO];

    case E_TaskCode.COMPLETED:
      return E_TaskTypeToCode[E_TaskCode.COMPLETED];

    case E_TaskCode.IN_PROGRESS:
      return E_TaskTypeToCode[E_TaskCode.IN_PROGRESS];

    case E_TaskCode.CANCELED:
      return E_TaskTypeToCode[E_TaskCode.CANCELED];
    default:
      return "error";
  }
}
