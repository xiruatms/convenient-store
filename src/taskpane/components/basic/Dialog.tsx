import * as React from "react";
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { FilterStyle } from "./FilterPanel.style";
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { hiddenContentStyle, mergeStyles } from '@fluentui/react/lib/Styling';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { ContextualMenu } from '@fluentui/react/lib/ContextualMenu';
import { useId, useBoolean } from '@fluentui/react-hooks';
import {Progress} from "./Progress"
import { values } from '@fluentui/react';
const dialogStyles = { main: { maxWidth: 450 } };
const dragOptions = {
  moveMenuItemText: 'Move',
  closeMenuItemText: 'Close',
  menu: ContextualMenu,
  keepInBounds: true,
};
const screenReaderOnly = mergeStyles(hiddenContentStyle);
const dialogContentProps = {
  type: DialogType.normal,
  title: '下载中……',
  //closeButtonAriaLabel: '关闭',
  // subText: 'Do you want to send this message without a subject?',
};

interface Props {
    visible:boolean,
    onclose: () => void,
    percentage:number | string
}

export const LoadingDialog: React.FunctionComponent<Props> = (props:any) => {

  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const [isDraggable, { toggle: toggleIsDraggable }] = useBoolean(false);
  const labelId: string = useId('dialogLabel');
  const subTextId: string = useId('subTextLabel');

  const modalProps = React.useMemo(
    () => ({
      titleAriaId: labelId,
      subtitleAriaId: subTextId,
      isBlocking: false,
      styles: dialogStyles,
      dragOptions: isDraggable ? dragOptions : undefined,
    }),
    [isDraggable, labelId, subTextId],
  );

  return (
    <>
      <Dialog
        hidden={!props.visible}
        onDismiss={props.onclose}
        dialogContentProps={dialogContentProps}
        modalProps={modalProps}
      >
        <Progress percentage={props.percentage}></Progress>
        <DialogFooter>
          <PrimaryButton style={FilterStyle.ack} styles={{root:{background: "#D44519"}, rootHovered:{background: "#B64020"}}} onClick={props.onclose} text="取消" />
        </DialogFooter>
      </Dialog>
    </>
  );
};
