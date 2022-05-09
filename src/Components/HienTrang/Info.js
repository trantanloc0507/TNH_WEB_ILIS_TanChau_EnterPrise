import React from 'react';
import { Text, Stack, Icon, Persona, PersonaInitialsColor, PersonaSize, ScrollablePane, Link } from '@fluentui/react';
import COLOR from "../../Styles/Colors";
import { useSelector } from "react-redux";
import { QD_GiaDat, formatNumber } from "../../Containers/MainController";


const Info = () => {
    const listQuyHoach = useSelector(state => state.quyHoachInfo);
    const dataKhongThuocTinh = useSelector(state => state.hienTrang.dataThuaDatPickedKhongThuocTinh);
    const data = useSelector(state => state.hienTrang.dataThuaDatPicked);
    const giadat = useSelector(state => state.giadat.giadat);

    const getQuyHoachList = () => {
        let { SOTO, SOTHUA, MaDVHC } = data;
        if (SOTO && SOTHUA && MaDVHC) {
            let checkExist = listQuyHoach.filter(e => (
                e.SoTo === SOTO.trim()
                && e.SoThua === SOTHUA.trim()
                && e.MaDvhc === MaDVHC.toString().trim()
            ));
            if (checkExist.length)
                return checkExist[0].data;
        }
        return []
    };
    return (
        <div className='modal-content-container'>
            <ScrollablePane>
                {
                    dataKhongThuocTinh ?
                        <div className='animated-panel'>
                            <Text variant='xLarge' className='title'>Thông tin</Text>
                            <Stack tokens={{ childrenGap: 20 }} styles={styles.infoView}>
                                <Stack>
                                    <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign='center'>
                                        <Icon iconName='Nav2DMapView' styles={styles.titleIcon} />
                                        <Text variant='medium' styles={styles.title}>Thông tin chung</Text>
                                    </Stack>
                                    <Stack style={{ marginTop: 5 }} horizontal verticalAlign='center' tokens={{ childrenGap: 8 }}>
                                        <Text variant='smallPlus' styles={styles.content}>Tờ bản đồ số</Text>
                                        <Text variant='medium' styles={styles.strongContent}>{dataKhongThuocTinh.SOTO}</Text>
                                    </Stack>
                                    <Stack style={{ marginTop: 5 }} horizontal verticalAlign='center' tokens={{ childrenGap: 8 }}>
                                        <Text variant='smallPlus' styles={styles.content}>Thửa số</Text>
                                        <Text variant='medium' styles={styles.strongContent}>{dataKhongThuocTinh.SOTHUA}</Text>
                                    </Stack>
                                    <Stack style={{ marginTop: 5 }} horizontal verticalAlign='center' tokens={{ childrenGap: 8 }}>
                                        <Text variant='smallPlus' styles={styles.content}>Diện tích</Text>
                                        <Text variant='medium' styles={styles.squareContent}>{dataKhongThuocTinh.DienTich}</Text>
                                        <Text variant='small'>㎡</Text>
                                    </Stack>
                                    {
                                        !dataKhongThuocTinh.TenChu ? null :
                                            <Stack horizontal verticalAlign='center'>
                                                <Persona
                                                    initialsColor={PersonaInitialsColor.orange}
                                                    text={dataKhongThuocTinh.TenChu}
                                                    hidePersonaDetails
                                                    size={PersonaSize.size24}
                                                    styles={{ root: { marginRight: 8 } }}
                                                />
                                                <Text styles={styles.personName}>{dataKhongThuocTinh.TenChu}</Text>
                                            </Stack>
                                    }

                                    <Stack>
                                        <Stack style={{ marginTop: 10 }} horizontal tokens={{ childrenGap: 8 }} verticalAlign='center'>
                                            <Icon iconName='DeveloperTools' styles={styles.titleIcon} />
                                            <Text variant='medium' styles={styles.title}>Loại đất</Text>
                                        </Stack>
                                        <Stack horizontal tokens={{ childrenGap: 8 }}>
                                            <Icon iconName='SquareShapeSolid' styles={styles.squareIcon(dataKhongThuocTinh.Color)} />
                                            <Text style={{ fontFamily: 'Open Sans', marginTop: 2 }} variant='smallPlus'>{dataKhongThuocTinh.LoaiDat}</Text>
                                        </Stack>
                                    </Stack>

                                    <Stack>
                                        <Stack horizontal style={{ backgroundColor: COLOR.border, height: 1.5, marginBottom: 10, marginTop: 10 }} />
                                        <Stack horizontal tokens={{ childrenGap: 8 }}>
                                            <Icon iconName='VennDiagram' styles={styles.titleIcon} />
                                            <Text style={{ fontFamily: 'Open Sans', marginTop: 2 }} variant='smallPlus'>{'Chưa có thông tin chi tiết thửa đất'}</Text>
                                        </Stack>
                                    </Stack>

                                </Stack>
                            </Stack>
                        </div>
                        :
                        <div className='animated-panel'>
                            <Text variant='xLarge' className='title'>Thông tin</Text>
                            <Stack tokens={{ childrenGap: 20 }} styles={styles.infoView}>
                                <Stack>
                                    <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign='center'>
                                        <Icon iconName='Nav2DMapView' styles={styles.titleIcon} />
                                        <Text variant='medium' styles={styles.title}>Thông tin chung</Text>
                                    </Stack>
                                    <Stack horizontal verticalAlign='center' tokens={{ childrenGap: 8 }}>
                                        <Text variant='smallPlus' styles={styles.content}>Tờ bản đồ số</Text>
                                        <Text variant='medium' styles={styles.strongContent}>{data.SOTO}</Text>
                                    </Stack>
                                    <Stack horizontal verticalAlign='center' tokens={{ childrenGap: 8 }}>
                                        <Text variant='smallPlus' styles={styles.content}>Thửa số</Text>
                                        <Text variant='medium' styles={styles.strongContent}>{data.SOTHUA}</Text>
                                    </Stack>
                                    <Stack horizontal verticalAlign='center' tokens={{ childrenGap: 8 }}>
                                        <Text variant='smallPlus' styles={styles.content}>Diện tích</Text>
                                        <Text variant='medium' styles={styles.squareContent}>{data.DienTich}</Text>
                                        <Text variant='small'>㎡</Text>
                                    </Stack>
                                </Stack>
                                {Array.isArray(data.MucDichSDD) ?
                                    <Stack>
                                        <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign='center'>
                                            <Icon iconName='DeveloperTools' styles={styles.titleIcon} />
                                            <Text variant='medium' styles={styles.title}>Mục đích sử dụng</Text>
                                        </Stack>
                                        {data.MucDichSDD.map((element, i) => (
                                            <Stack key={i.toString()} horizontal tokens={{ childrenGap: 8 }}>
                                                <Icon iconName='SquareShapeSolid' styles={styles.squareIcon(element.color)} />
                                                <Text style={{ fontFamily: 'Open Sans' }} variant='smallPlus'>{element.name}</Text>
                                            </Stack>
                                        ))}
                                    </Stack>
                                    : undefined
                                }
                                <Stack>
                                    <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign='center'>
                                        <Icon iconName='POISolid' styles={styles.titleIcon} />
                                        <Text variant='medium' styles={styles.title}>Địa chỉ thửa đất</Text>
                                    </Stack>
                                    <Text style={{ fontFamily: 'Open Sans' }} variant='smallPlus'>{data.DiaChiThuaDat}</Text>
                                </Stack>
                                <Stack tokens={{ childrenGap: 0 }}>
                                    <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign='center'>
                                        <Icon iconName='Shield' styles={styles.titleIcon} />
                                        <Text variant='medium' styles={styles.title}>Trạng thái pháp lý</Text>
                                    </Stack>
                                    <Stack horizontal verticalAlign='center' tokens={{ childrenGap: 8 }}>
                                        <Text style={{ fontFamily: 'Open Sans' }} variant='smallPlus'>{data.TrangThaiThuaDat}</Text>
                                        <Icon iconName='CompletedSolid' styles={styles.verifyIcon} />
                                    </Stack>
                                </Stack>

                                <Stack>
                                    <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign='center'>
                                        <Icon iconName='MapLayers' styles={styles.titleIcon} />
                                        <Text variant='medium' styles={styles.title}>Quy hoạch</Text>
                                    </Stack>
                                    {getQuyHoachList().length ?
                                        getQuyHoachList().map((element, i) => (
                                            <Stack key={i.toString()} horizontal tokens={{ childrenGap: 8 }}>
                                                <Icon iconName='SquareShapeSolid' styles={styles.squareIcon(element.color)} />
                                                <Text style={{ fontFamily: 'Open Sans' }} variant='smallPlus'>{element.quyhoach}</Text>
                                            </Stack>
                                        ))
                                        :
                                        <Text style={{ fontFamily: 'Open Sans' }} variant='smallPlus'>Không nằm trong quy hoạch</Text>
                                    }
                                </Stack>
                                {data.Ten1 || data.Ten2 ?
                                    <Stack tokens={{ childrenGap: 8 }}>
                                        <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign='center'>
                                            <Icon iconName='People' styles={styles.titleIcon} />
                                            <Text variant='medium' styles={styles.title}>Chủ sử dụng</Text>
                                        </Stack>
                                        <Stack tokens={{ childrenGap: 12 }}>
                                            {data.Ten1 ?
                                                <Stack>
                                                    <Stack horizontal verticalAlign='center'>
                                                        <Persona
                                                            initialsColor={data.GioiTinh1 ? PersonaInitialsColor.teal : PersonaInitialsColor.orange}
                                                            text={data.Ten1}
                                                            hidePersonaDetails
                                                            size={PersonaSize.size24}
                                                            styles={{ root: { marginRight: 8 } }}
                                                        />
                                                        <Text styles={styles.personName}>{data.Ten1}</Text>
                                                    </Stack>
                                                    {
                                                        !data.NamSinh1 ? null :
                                                            <Stack horizontal verticalAlign='end'>
                                                                <Icon iconName="BirthdayCake"
                                                                    styles={{ root: { marginRight: 10, marginLeft: 5 } }} />
                                                                <Text style={{ fontFamily: 'Open Sans' }} variant='small'>
                                                                    {data.NamSinh1}
                                                                </Text>
                                                            </Stack>
                                                    }
                                                    {
                                                        !data.DiaChi1 ? null :
                                                            <Stack horizontal verticalAlign='top'>
                                                                <Icon iconName="Home"
                                                                    styles={{ root: { marginRight: 10, marginLeft: 5 } }} />
                                                                <Text style={{ fontFamily: 'Open Sans' }} variant='small'>
                                                                    {data.DiaChi1}
                                                                </Text>
                                                            </Stack>
                                                    }
                                                </Stack>
                                                : null
                                            }

                                            {data.Ten2 ?
                                                <Stack>
                                                    <Stack horizontal verticalAlign='center'>
                                                        <Persona
                                                            initialsColor={data.GioiTinh2 ? PersonaInitialsColor.teal : PersonaInitialsColor.orange}
                                                            text={data.Ten2}
                                                            hidePersonaDetails
                                                            size={PersonaSize.size24}
                                                            styles={{ root: { marginRight: 8 } }}
                                                        />
                                                        <Text style={{ fontFamily: 'Open Sans' }} styles={styles.personName}>{data.Ten2}</Text>
                                                    </Stack>
                                                    {
                                                        !data.NamSinh2 ? null :
                                                            <Stack horizontal verticalAlign='end'>
                                                                <Icon iconName="BirthdayCake"
                                                                    styles={{ root: { marginRight: 10, marginLeft: 5 } }} />
                                                                <Text style={{ fontFamily: 'Open Sans' }} variant='small'>
                                                                    {data.NamSinh2}
                                                                </Text>
                                                            </Stack>
                                                    }
                                                    {
                                                        !data.DiaChi2 ? null :
                                                            <Stack horizontal verticalAlign='top'>
                                                                <Icon iconName="Home"
                                                                    styles={{ root: { marginRight: 10, marginLeft: 5 } }} />
                                                                <Text style={{ fontFamily: 'Open Sans' }} variant='small'>
                                                                    {data.DiaChi2}
                                                                </Text>
                                                            </Stack>
                                                    }

                                                </Stack>
                                                : null
                                            }
                                            {
                                                !giadat ? null :
                                                    <Stack tokens={{ childrenGap: 0 }}>
                                                        <Stack tokens={{ childrenGap: 0 }}>
                                                            <Stack horizontal style={{ backgroundColor: COLOR.border, height: 1.5, marginBottom: 10 }} />
                                                            <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign='center'>
                                                                <Icon iconName='Money' styles={styles.titleIcon} />
                                                                <Text variant='medium' styles={styles.contentGia}>Giá đất được tham khảo theo: </Text>
                                                            </Stack>
                                                            <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign='center'>
                                                                <Link onClick={() => { window.open("https://congbao.tayninh.gov.vn/Uploads/VanBan/VanBanCongBao/2020/9/35%20qppl.signed.pdf") }}><Text variant='small' >{QD_GiaDat.QD}  {QD_GiaDat.HIEULUC ? 'Hiệu lực: ' + QD_GiaDat.HIEULUC : ''}</Text></Link>
                                                            </Stack>
                                                        </Stack>
                                                        {
                                                            giadat.map((item, index) => {
                                                                if (item.GiaTri)
                                                                    return (
                                                                        <Stack key={index} tokens={{ childrenGap: 0 }} style={{ marginBottom: 5 }}>
                                                                            <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign='center'>
                                                                                <Icon iconName='DiamondSolid' styles={styles.titleGia} />
                                                                                <Text variant='small' styles={styles.contentGia}>{formatNumber(item.GiaTri)} vnđ</Text>
                                                                            </Stack>
                                                                            {
                                                                                !(item.MaLoaiDat || item.KhuVuc || item.TenViTri) ? null :
                                                                                    <Text variant='small' styles={styles.title}>
                                                                                        {item.MaLoaiDat ? 'Loại đất: ' + item.MaLoaiDat + ',    ' : null}
                                                                                        {item.KhuVuc ? item.KhuVuc + ',    ' : null}
                                                                                        {item.TenViTri ? item.TenViTri : null}
                                                                                    </Text>
                                                                            }
                                                                            {
                                                                                !(item.TenDoanDuong || item.TenDuong) ? null :
                                                                                    <Text variant='small' styles={styles.title}>
                                                                                        {item.TenDoanDuong ? item.TenDoanDuong + ', ' : null}
                                                                                        {item.TenDuong ? item.TenDuong : null}
                                                                                    </Text>
                                                                            }
                                                                        </Stack>
                                                                    )
                                                            })
                                                        }
                                                    </Stack>
                                            }
                                        </Stack>
                                    </Stack>
                                    : null
                                }
                            </Stack>
                        </div>
                }
            </ScrollablePane>
        </div>
    )
};

export default Info;

const styles = {
    infoView: {
        root: {
            paddingBottom: 20,
            flex: 1,
            marginRight: -16,
            paddingRight: 16
        }
    },
    titleIcon: {
        root: {
            color: COLOR.darkGray
        }
    },
    titleGia: {
        root: {
            color: COLOR.orange,
        }
    },
    title: {
        root: {
            color: COLOR.black,
            fontWeight: 'bold',
            fontFamily: 'Open Sans'
        }
    },
    contentGia: {
        root: {
            color: COLOR.black,
            fontWeight: 'bold',
            fontFamily: 'Open Sans'
        }
    },
    content: {
        root: {
            width: 100,
            fontFamily: 'Open Sans'
        }
    },
    squareContent: {
        root: {
            // color:COLOR.black,
            marginLeft: 8,
            color: '#007B72',
            fontWeight: 'bold',
            fontFamily: 'Open Sans'
        }
    },
    strongContent: {
        root: {
            color: '#007B72',
            marginLeft: 8,
            fontWeight: 'bold',
            fontFamily: 'Open Sans'
        }
    },
    verifyIcon: {
        root: {
            color: '#007B72',
            fontSize: 12
        }
    },
    squareIcon: (color) => ({
        root: {
            color,
            fontSize: 10,
            marginTop: 4,
        }
    }),
    personName: {
        root: {
            fontWeight: 'bold',
            fontFamily: 'Open Sans'
        }
    }
};
