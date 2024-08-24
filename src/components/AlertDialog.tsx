"use client";

import { Modal } from "./Modal";

type Props = {
  show?: boolean;
  title: string;
  subtitle?: string;
  confirmLabel: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

export function AlertDialog(props: Props) {
  return (
    <Modal show={props.show} onRequestClose={props.onCancel}>
      <div className="my-2 text-lg">{props.title}</div>
      {props.subtitle && <div className="text-sm">{props.subtitle}</div>}
      <div className="mt-4 border-t border-neutral pt-2">
        <button
          className="btn btn-ghost btn-block text-error"
          onClick={props.onConfirm}
        >
          {props.confirmLabel}
        </button>
        <button className="btn btn-ghost btn-block" onClick={props.onCancel}>
          キャンセル
        </button>
      </div>
    </Modal>
  );
}
