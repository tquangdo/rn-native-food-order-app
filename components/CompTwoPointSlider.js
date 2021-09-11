import MultiSlider from '@ptomasroos/react-native-multi-slider'
import React from 'react'
import { Text, View } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'

const CompTwoPointSlider = ({ propValues, propMin, propMax, propPrefix, propPostfix,
    propOnValuesChange,
}) => {
    return (
        <MultiSlider
            values={propValues}
            sliderLength={SIZES.width - (SIZES.padding * 2) - 20}
            min={propMin}
            max={propMax}
            step={1}
            markerOffsetY={20}
            selectedStyle={{ backgroundColor: COLORS.primary }}
            trackStyle={{
                height: 10,
                borderRadius: 10,
                backgroundColor: COLORS.lightGray2
            }}
            minMarkerOverlapDistance={50}
            customMarker={e => {
                return (
                    <View
                        style={{
                            height: 60,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <View
                            style={{
                                height: 30,
                                width: 30,
                                borderRadius: 15,
                                borderWidth: 4,
                                borderColor: COLORS.white,
                                backgroundColor: COLORS.primary,
                                shadowColor: '#000000',
                                shadowOffset: {
                                    width: 0,
                                    height: 3,
                                },
                                shadowRadius: 1,
                                shadowOpacity: 0.1,
                            }}
                        />
                        <Text
                            style={{
                                marginTop: 5,
                                color: COLORS.darkGray,
                                ...FONTS.body3,
                            }}
                        >
                            {propPrefix}{e.currentValue}{propPostfix}
                        </Text>
                    </View>
                )
            }}
            onValuesChange={item_val => propOnValuesChange(item_val)}
        />
    )
}

export default CompTwoPointSlider
