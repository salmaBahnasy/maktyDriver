
import React from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Platform } from 'react-native';



function DatePickerModal(props) {
let maxDate = new Date();

return (
    <DateTimePickerModal
    isVisible={ props?.isDatePickerVisible}
    mode="date"
    onConfirm={props?.handleConfirm}
    onCancel={props?.hideDatePicker}
    maximumDate={maxDate}
    display={Platform.OS=='ios'?'default':'calendar'}
  />
  );
}



export default DatePickerModal;
