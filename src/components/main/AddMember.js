import React, {useEffect} from 'react';
import styled, {css} from 'styled-components';
import colors from '../../styles/Colors';
import Input from "../share/Input";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from "@mui/material/TextField";
import Button from "../share/Button";
import DaumPostcode from "react-daum-postcode";
import {Modal} from '@material-ui/core';
import addImage from '../../images/addImage.svg';
// import Select from "../share/Select";

const Wrapper = styled.div`
  background: ${colors.backgroundColor};
`;
const InputBox = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 30px auto;
  position: relative;
  border-radius: 8px;
  background: ${colors.whiteColor};
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%);
`;
const InputLine = styled.div`
  padding: 10px 16px;
  display: flex;
  align-items: ${({align}) => align ? align : 'center'};
  border-bottom: 1px solid ${colors.borderColor};
  
  &:last-child {
    border-bottom: none;
  }

  // Input Style
  .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input {
    height: 35px;
    padding: 0 10px;
  }

  .css-bkqowc-MuiInputBase-root-MuiOutlinedInput-root {
    border-radius: 0;
  }

  .css-aqhoke-MuiFormLabel-root-MuiInputLabel-root {
    top: -9px;
    font-size: 14px;
  }

  // Radio Style
  .css-18irotk-MuiButtonBase-root-MuiRadio-root {
    color: ${colors.grayColor};
  }

  .css-1u3bzj6-MuiFormControl-root-MuiTextField-root {
    width: 175px;
  }
`;
const Title = styled.div`
  min-width: 130px;
  font-size: 16px;
  color: ${colors.blackColor};
  ${({paddingTop}) => paddingTop && css`
    padding-top: 5px;
  `}
`;
const AddressBox = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const UnionServiceBox = styled.div`
  display: flex;
  justify-content: center;
`;
const ButtonGroup = styled.div`
  margin: ${({margin}) => margin ? margin : 0};
  text-align: center;
`;
const PostModal = styled(Modal)`
  width: 500px;
  margin: 10% auto;
`;
const AdditionalServiceBox = styled.div`
  .css-j204z7-MuiFormControlLabel-root { // CheckBox Style
    min-width: 150px;
  }
`;
const AdditionalService = styled.div`
  display: flex;

  .css-1u3bzj6-MuiFormControl-root-MuiTextField-root { // DatePicker Style
    width: 160px;
  }
`;
const LogoBox = styled.div`
  width: 300px;
  height: 100px;
  border: 1px solid ${colors.borderColor};
  padding: 10px;
  position: relative;
  background-color: ${colors.whiteColor};
  
  ${({ logoFile }) => !logoFile && css`
    background-image: url(${addImage});
    background-repeat: no-repeat;
    background-position: 50% 30%;

    &:after {
      content: "?????? ????????? ??????";
      color: ${colors.grayColor};
      position: absolute;
      top: 55%;
      left: 50%;
      transform: translate(-50%, 0%);
    }
  `}
`;
const FileInput = styled.input`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0;
  cursor: pointer;
`;
const AppImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AddMember = ({
                       usedPeriod,
                       handleDateChange,
                       handleGoodsType,
                       serviceType,
                       setServiceType,
                       openAddress,
                       setOpenAddress,
                       handleAddressComplete,
                       memberInfo,
                       infoInputChange,
                       unionService,
                       handleUnionService,
                       handleSetDate,
                       // ?????? props
                       updateCorpData,
                       modalVisible,
                       handleModalClose,
                       onLogoChange,
                       onMemberRegister,
                   }) => {
    const { bizName, bizNum, bizAddress, bizDetailAddress, bizTel, ceoName, ceoPhone, managerName, logoFile, previewUrl } = memberInfo;
    const {live, linkBinder, shopping, gate} = unionService;

    useEffect(() => {
        return setServiceType('');
    }, [setServiceType]);

    useEffect(() => {
        console.info('usedPeriod ::: ', usedPeriod);
    }, [usedPeriod]);

    return (
        <Wrapper>
            <InputBox>
                <InputLine>
                    <Title>?????????</Title>
                    <Input
                        width={30}
                        value={bizName}
                        infoInputChange={infoInputChange}
                        name="bizName"
                        type="BIZ_NAME"
                        placeholder="????????? ????????? ??????????????????."
                    />
                </InputLine>
                <InputLine>
                    <Title>?????? ?????????</Title>
                    <LogoBox logoFile={!!logoFile}>
                        <FileInput type="file" accept="image/*" onChange={onLogoChange} />
                        {logoFile && <AppImage src={previewUrl} alt="Logo" />}
                    </LogoBox>
                </InputLine>
                <InputLine>
                    <Title>????????? ??????</Title>
                    <Input
                        width={30}
                        infoInputChange={infoInputChange}
                        value={bizNum}
                        name="bizNum"
                        type="BIZ_NUM"
                        placeholder="????????? ????????? ??????????????????."
                    />
                </InputLine>
                <InputLine align="flex-start">
                    <Title>????????? ??????</Title>
                    <AddressBox>
                        <Input
                            readOnly
                            width={42}
                            setOpenAddress={setOpenAddress}
                            value={bizAddress}
                            placeholder="????????? ??????????????????.."
                        />
                        <Input
                            width={42}
                            infoInputChange={infoInputChange}
                            value={bizDetailAddress}
                            name="bizDetailAddress"
                            type="BIZ_DETAIL_ADDRESS"
                            placeholder="??????????????? ??????????????????."
                        />
                        <PostModal
                            open={openAddress}
                            onClose={() => setOpenAddress(false)}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                        >
                            <>
                                <DaumPostcode onComplete={handleAddressComplete}/>
                            </>
                        </PostModal>
                    </AddressBox>
                </InputLine>

                <InputLine>
                    <Title>????????? ???</Title>
                    <Input
                        width={30}
                        infoInputChange={infoInputChange}
                        value={ceoName}
                        name="ceoName"
                        type="CEO_NAME"
                        placeholder="???????????? ????????? ??????????????????."
                    />
                </InputLine>
                <InputLine>
                    <Title>????????? ??????</Title>
                    <Input
                        width={30}
                        infoInputChange={infoInputChange}
                        value={ceoPhone}
                        name="ceoPhone"
                        type="CEO_PHONE"
                        placeholder="???????????? ????????? ????????? ??????????????????."
                    />
                </InputLine>

                <InputLine>
                    <Title>????????? ???</Title>
                    <Input
                        width={30}
                        infoInputChange={infoInputChange}
                        value={managerName}
                        name="managerName"
                        type="MANAGER_NAME"
                        placeholder="???????????? ????????? ??????????????????."
                    />
                </InputLine>
                <InputLine>
                    <Title>????????????</Title>
                    <Input
                        width={30}
                        infoInputChange={infoInputChange}
                        value={bizTel}
                        name="bizTel"
                        type="BIZ_TEL"
                        placeholder="????????? ??????????????? ??????????????????."
                    />
                </InputLine>

                <InputLine>
                    <Title>?????? ??????</Title>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="?????????"
                            value={usedPeriod.start}
                            onChange={newValue => handleDateChange(newValue, 'START_USING')}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    &nbsp;~&nbsp;
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="?????????"
                            value={usedPeriod.finish}
                            onChange={newValue => handleDateChange(newValue, 'FINISH_USING')}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <ButtonGroup margin="0 0 0 20px">
                        <Button
                            width={55}
                            height={35}
                            title="6??????"
                            type="6_MONTH"
                            borderRadius="none"
                            border={`1px solid ${colors.borderColor}`}
                            bgColor={colors.whiteColor}
                            onClick={handleSetDate}
                        >
                        </Button>
                        <Button
                            width={55}
                            height={35}
                            title="12??????"
                            type="12_MONTH"
                            borderRadius="none"
                            border={`1px solid ${colors.borderColor}`}
                            bgColor={colors.whiteColor}
                            onClick={handleSetDate}
                        >
                        </Button>
                        <Button
                            width={55}
                            height={35}
                            title="18??????"
                            type="18_MONTH"
                            borderRadius="none"
                            border={`1px solid ${colors.borderColor}`}
                            bgColor={colors.whiteColor}
                            onClick={handleSetDate}
                        >
                        </Button>
                        <Button
                            width={55}
                            height={35}
                            title="24??????"
                            type="24_MONTH"
                            borderRadius="none"
                            border={`1px solid ${colors.borderColor}`}
                            bgColor={colors.whiteColor}
                            onClick={handleSetDate}
                        >
                        </Button>
                        <Button
                            width={55}
                            height={35}
                            title="30??????"
                            type="30_MONTH"
                            borderRadius="none"
                            border={`1px solid ${colors.borderColor}`}
                            bgColor={colors.whiteColor}
                            onClick={handleSetDate}
                        >
                        </Button>
                        <Button
                            width={55}
                            height={35}
                            title="36??????"
                            type="36_MONTH"
                            borderRadius="none"
                            border={`1px solid ${colors.borderColor}`}
                            bgColor={colors.whiteColor}
                            onClick={handleSetDate}
                        >
                        </Button>
                        <Button
                            width={55}
                            height={35}
                            title="?????????"
                            type="USED_PERIOD_RESET"
                            borderRadius="none"
                            border={`1px solid ${colors.borderColor}`}
                            bgColor={colors.whiteColor}
                            onClick={handleSetDate}
                        >
                        </Button>
                    </ButtonGroup>
                </InputLine>


                <InputLine>
                    <Title>?????? ??????</Title>
                    <RadioGroup row aria-label="type" name="row-radio-buttons-group">
                        <FormControlLabel value="meet_up" control={<Radio/>} label="??????" onChange={handleGoodsType} />
                        <FormControlLabel value="union" control={<Radio/>} label="?????????" onChange={handleGoodsType} />
                        <FormControlLabel value="gate" control={<Radio/>} label="?????????" onChange={handleGoodsType} />
                    </RadioGroup>
                </InputLine>

                {/* ????????? ??????????????? */}
                {((serviceType === 'union') || (serviceType === 'gate')) &&
                    <InputLine align="flex-start">
                        <UnionServiceBox>
                            <Title paddingTop>?????? ?????????</Title>
                            <AdditionalServiceBox>
                                <AdditionalService>
                                    <FormControlLabel
                                        label="???????????????"
                                        control={
                                            <Checkbox
                                                name="live"
                                                value={live.isService}
                                                checked={live.isService}
                                                onChange={handleUnionService}
                                            />}
                                    />
                                    {live.isService && (
                                        <>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    label="?????????"
                                                    value={live.period.start}
                                                    onChange={newValue => handleDateChange(newValue, 'LIVE_START')}
                                                    renderInput={(params) => <TextField {...params} />}
                                                    disabled={!!usedPeriod.start}
                                                />
                                            </LocalizationProvider>
                                            &nbsp;~&nbsp;
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    label="?????????"
                                                    value={live.period.finish}
                                                    onChange={newValue => handleDateChange(newValue, 'LIVE_FINISH')}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                            <ButtonGroup margin="0 0 0 20px">
                                                <Button
                                                    width={55}
                                                    height={35}
                                                    title="6??????"
                                                    type="6_MONTH"
                                                    service="live"
                                                    borderRadius="none"
                                                    border={`1px solid ${colors.borderColor}`}
                                                    bgColor={colors.whiteColor}
                                                    onClick={handleSetDate}
                                                >
                                                </Button>
                                                <Button
                                                    width={55}
                                                    height={35}
                                                    title="12??????"
                                                    type="12_MONTH"
                                                    service="live"
                                                    borderRadius="none"
                                                    border={`1px solid ${colors.borderColor}`}
                                                    bgColor={colors.whiteColor}
                                                    onClick={handleSetDate}
                                                >
                                                </Button>
                                                <Button
                                                    width={55}
                                                    height={35}
                                                    title="18??????"
                                                    type="18_MONTH"
                                                    service="live"
                                                    borderRadius="none"
                                                    border={`1px solid ${colors.borderColor}`}
                                                    bgColor={colors.whiteColor}
                                                    onClick={handleSetDate}
                                                >
                                                </Button>
                                                <Button
                                                    width={55}
                                                    height={35}
                                                    title="24??????"
                                                    type="24_MONTH"
                                                    service="live"
                                                    borderRadius="none"
                                                    border={`1px solid ${colors.borderColor}`}
                                                    bgColor={colors.whiteColor}
                                                    onClick={handleSetDate}
                                                >
                                                </Button>
                                                <Button
                                                    width={55}
                                                    height={35}
                                                    title="30??????"
                                                    type="30_MONTH"
                                                    service="live"
                                                    borderRadius="none"
                                                    border={`1px solid ${colors.borderColor}`}
                                                    bgColor={colors.whiteColor}
                                                    onClick={handleSetDate}
                                                >
                                                </Button>
                                                <Button
                                                    width={55}
                                                    height={35}
                                                    title="36??????"
                                                    type="36_MONTH"
                                                    service="live"
                                                    borderRadius="none"
                                                    border={`1px solid ${colors.borderColor}`}
                                                    bgColor={colors.whiteColor}
                                                    onClick={handleSetDate}
                                                >
                                                </Button>
                                                <Button
                                                    width={55}
                                                    height={35}
                                                    title="?????????"
                                                    type="USED_PERIOD_RESET"
                                                    service="live"
                                                    borderRadius="none"
                                                    border={`1px solid ${colors.borderColor}`}
                                                    bgColor={colors.whiteColor}
                                                    onClick={handleSetDate}
                                                >
                                                </Button>
                                            </ButtonGroup>
                                        </>
                                    )}
                                </AdditionalService>
                                <AdditionalService>
                                    <FormControlLabel
                                        label="???????????????"
                                        control={
                                            <Checkbox
                                                name="linkBinder"
                                                value={linkBinder.isService}
                                                checked={linkBinder.isService}
                                                onChange={handleUnionService}
                                            />}
                                    />
                                    {linkBinder.isService && (
                                        <>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    label="?????????"
                                                    value={linkBinder.period.start}
                                                    onChange={newValue => handleDateChange(newValue, 'LINK_BINDER_START')}
                                                    renderInput={(params) => <TextField {...params} />}
                                                    disabled={!!usedPeriod.start}
                                                />
                                            </LocalizationProvider>
                                            &nbsp;~&nbsp;
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    label="?????????"
                                                    value={linkBinder.period.finish}
                                                    onChange={newValue => handleDateChange(newValue, 'LINK_BINDER_FINISH')}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                            <ButtonGroup margin="0 0 0 20px">
                                                <Button
                                                    width={55}
                                                    height={35}
                                                    title="6??????"
                                                    type="6_MONTH"
                                                    service="linkBinder"
                                                    borderRadius="none"
                                                    border={`1px solid ${colors.borderColor}`}
                                                    bgColor={colors.whiteColor}
                                                    onClick={handleSetDate}
                                                >
                                                </Button>
                                                <Button
                                                    width={55}
                                                    height={35}
                                                    title="12??????"
                                                    type="12_MONTH"
                                                    service="linkBinder"
                                                    borderRadius="none"
                                                    border={`1px solid ${colors.borderColor}`}
                                                    bgColor={colors.whiteColor}
                                                    onClick={handleSetDate}
                                                >
                                                </Button>
                                                <Button
                                                    width={55}
                                                    height={35}
                                                    title="18??????"
                                                    type="18_MONTH"
                                                    service="linkBinder"
                                                    borderRadius="none"
                                                    border={`1px solid ${colors.borderColor}`}
                                                    bgColor={colors.whiteColor}
                                                    onClick={handleSetDate}
                                                >
                                                </Button>
                                                <Button
                                                    width={55}
                                                    height={35}
                                                    title="24??????"
                                                    type="24_MONTH"
                                                    service="linkBinder"
                                                    borderRadius="none"
                                                    border={`1px solid ${colors.borderColor}`}
                                                    bgColor={colors.whiteColor}
                                                    onClick={handleSetDate}
                                                >
                                                </Button>
                                                <Button
                                                    width={55}
                                                    height={35}
                                                    title="30??????"
                                                    type="30_MONTH"
                                                    service="linkBinder"
                                                    borderRadius="none"
                                                    border={`1px solid ${colors.borderColor}`}
                                                    bgColor={colors.whiteColor}
                                                    onClick={handleSetDate}
                                                >
                                                </Button>
                                                <Button
                                                    width={55}
                                                    height={35}
                                                    title="36??????"
                                                    type="36_MONTH"
                                                    service="linkBinder"
                                                    borderRadius="none"
                                                    border={`1px solid ${colors.borderColor}`}
                                                    bgColor={colors.whiteColor}
                                                    onClick={handleSetDate}
                                                >
                                                </Button>
                                                <Button
                                                    width={55}
                                                    height={35}
                                                    title="?????????"
                                                    type="USED_PERIOD_RESET"
                                                    service="linkBinder"
                                                    borderRadius="none"
                                                    border={`1px solid ${colors.borderColor}`}
                                                    bgColor={colors.whiteColor}
                                                    onClick={handleSetDate}
                                                >
                                                </Button>
                                            </ButtonGroup>
                                        </>
                                    )}
                                </AdditionalService>
                                <AdditionalService>
                                    <FormControlLabel
                                        label="?????????"
                                        control={
                                            <Checkbox
                                                name="shopping"
                                                value={shopping.isService}
                                                checked={shopping.isService}
                                                onChange={handleUnionService}
                                            />}
                                    />
                                    {shopping.isService && (
                                        <>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    label="?????????"
                                                    value={shopping.period.start}
                                                    onChange={newValue => handleDateChange(newValue, 'SHOPPING_START')}
                                                    renderInput={(params) => <TextField {...params} />}
                                                    disabled={!!usedPeriod.start}
                                                />
                                            </LocalizationProvider>
                                            &nbsp;~&nbsp;
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    label="?????????"
                                                    value={shopping.period.finish}
                                                    onChange={newValue => handleDateChange(newValue, 'SHOPPING_FINISH')}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                            <ButtonGroup margin="0 0 0 20px">
                                                <Button
                                                    width={55}
                                                    height={35}
                                                    title="6??????"
                                                    type="6_MONTH"
                                                    service="shopping"
                                                    borderRadius="none"
                                                    border={`1px solid ${colors.borderColor}`}
                                                    bgColor={colors.whiteColor}
                                                    onClick={handleSetDate}
                                                >
                                                </Button>
                                                <Button
                                                    width={55}
                                                    height={35}
                                                    title="12??????"
                                                    type="12_MONTH"
                                                    service="shopping"
                                                    borderRadius="none"
                                                    border={`1px solid ${colors.borderColor}`}
                                                    bgColor={colors.whiteColor}
                                                    onClick={handleSetDate}
                                                >
                                                </Button>
                                                <Button
                                                    width={55}
                                                    height={35}
                                                    title="18??????"
                                                    type="18_MONTH"
                                                    service="shopping"
                                                    borderRadius="none"
                                                    border={`1px solid ${colors.borderColor}`}
                                                    bgColor={colors.whiteColor}
                                                    onClick={handleSetDate}
                                                >
                                                </Button>
                                                <Button
                                                    width={55}
                                                    height={35}
                                                    title="24??????"
                                                    type="24_MONTH"
                                                    service="shopping"
                                                    borderRadius="none"
                                                    border={`1px solid ${colors.borderColor}`}
                                                    bgColor={colors.whiteColor}
                                                    onClick={handleSetDate}
                                                >
                                                </Button>
                                                <Button
                                                    width={55}
                                                    height={35}
                                                    title="30??????"
                                                    type="30_MONTH"
                                                    service="shopping"
                                                    borderRadius="none"
                                                    border={`1px solid ${colors.borderColor}`}
                                                    bgColor={colors.whiteColor}
                                                    onClick={handleSetDate}
                                                >
                                                </Button>
                                                <Button
                                                    width={55}
                                                    height={35}
                                                    title="36??????"
                                                    type="36_MONTH"
                                                    service="shopping"
                                                    borderRadius="none"
                                                    border={`1px solid ${colors.borderColor}`}
                                                    bgColor={colors.whiteColor}
                                                    onClick={handleSetDate}
                                                >
                                                </Button>
                                                <Button
                                                    width={55}
                                                    height={35}
                                                    title="?????????"
                                                    type="USED_PERIOD_RESET"
                                                    service="shopping"
                                                    borderRadius="none"
                                                    border={`1px solid ${colors.borderColor}`}
                                                    bgColor={colors.whiteColor}
                                                    onClick={handleSetDate}
                                                >
                                                </Button>
                                            </ButtonGroup>
                                        </>
                                    )}
                                </AdditionalService>
                                {serviceType === 'gate' &&
                                    <AdditionalService>
                                        <FormControlLabel
                                            label="????????????"
                                            control={
                                                <Checkbox
                                                    name="gate"
                                                    value={gate.isService}
                                                    checked={gate.isService}
                                                    onChange={handleUnionService}
                                                />}
                                        />
                                        {gate.isService && (
                                            <>
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <DatePicker
                                                        label="?????????"
                                                        value={gate.period.start}
                                                        onChange={newValue => handleDateChange(newValue, 'GATE_START')}
                                                        renderInput={(params) => <TextField {...params} />}
                                                        disabled={!!usedPeriod.start}
                                                    />
                                                </LocalizationProvider>
                                                &nbsp;~&nbsp;
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <DatePicker
                                                        label="?????????"
                                                        value={gate.period.finish}
                                                        onChange={newValue => handleDateChange(newValue, 'GATE_FINISH')}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </LocalizationProvider>
                                                <ButtonGroup margin="0 0 0 20px">
                                                    <Button
                                                        width={55}
                                                        height={35}
                                                        title="6??????"
                                                        type="6_MONTH"
                                                        service="gate"
                                                        borderRadius="none"
                                                        border={`1px solid ${colors.borderColor}`}
                                                        bgColor={colors.whiteColor}
                                                        onClick={handleSetDate}
                                                    >
                                                    </Button>
                                                    <Button
                                                        width={55}
                                                        height={35}
                                                        title="12??????"
                                                        type="12_MONTH"
                                                        service="gate"
                                                        borderRadius="none"
                                                        border={`1px solid ${colors.borderColor}`}
                                                        bgColor={colors.whiteColor}
                                                        onClick={handleSetDate}
                                                    >
                                                    </Button>
                                                    <Button
                                                        width={55}
                                                        height={35}
                                                        title="18??????"
                                                        type="18_MONTH"
                                                        service="gate"
                                                        borderRadius="none"
                                                        border={`1px solid ${colors.borderColor}`}
                                                        bgColor={colors.whiteColor}
                                                        onClick={handleSetDate}
                                                    >
                                                    </Button>
                                                    <Button
                                                        width={55}
                                                        height={35}
                                                        title="24??????"
                                                        type="24_MONTH"
                                                        service="gate"
                                                        borderRadius="none"
                                                        border={`1px solid ${colors.borderColor}`}
                                                        bgColor={colors.whiteColor}
                                                        onClick={handleSetDate}
                                                    >
                                                    </Button>
                                                    <Button
                                                        width={55}
                                                        height={35}
                                                        title="30??????"
                                                        type="30_MONTH"
                                                        service="gate"
                                                        borderRadius="none"
                                                        border={`1px solid ${colors.borderColor}`}
                                                        bgColor={colors.whiteColor}
                                                        onClick={handleSetDate}
                                                    >
                                                    </Button>
                                                    <Button
                                                        width={55}
                                                        height={35}
                                                        title="36??????"
                                                        type="36_MONTH"
                                                        service="gate"
                                                        borderRadius="none"
                                                        border={`1px solid ${colors.borderColor}`}
                                                        bgColor={colors.whiteColor}
                                                        onClick={handleSetDate}
                                                    >
                                                    </Button>
                                                    <Button
                                                        width={55}
                                                        height={35}
                                                        title="?????????"
                                                        type="USED_PERIOD_RESET"
                                                        service="shopping"
                                                        borderRadius="none"
                                                        border={`1px solid ${colors.borderColor}`}
                                                        bgColor={colors.whiteColor}
                                                        onClick={handleSetDate}
                                                    >
                                                    </Button>
                                                </ButtonGroup>
                                            </>
                                        )}
                                    </AdditionalService>
                                }
                            </AdditionalServiceBox>
                        </UnionServiceBox>
                    </InputLine>
                }
            </InputBox>

            <ButtonGroup margin="50px auto 30px">
                {!!modalVisible &&
                <Button
                    width={120}
                    height={50}
                    fontSize={18}
                    margin="0 30px 0 0"
                    bgColor={colors.whiteColor}
                    border={`1px solid ${colors.darkGrayColor}`}
                    title="??? ???"
                    onClick={handleModalClose}
                />
                }
                <Button
                    width={120}
                    height={50}
                    fontSize={18}
                    fontColor={colors.whiteColor}
                    bgColor={colors.darkBlueColor}
                    title={modalVisible ? '??? ???' : '??? ???'}
                    onClick={onMemberRegister}
                />
            </ButtonGroup>
        </Wrapper>
    )
}

export default AddMember;