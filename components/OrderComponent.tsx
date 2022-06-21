import { Box, Button,  Group, LoadingOverlay,TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react'
import NumberFormat from 'react-number-format';
import styles from '../styles/Order.module.css'



type Props = {
    onSubmit: (values: any) => void,
    loading: boolean
}

export default function OrderComponent({ onSubmit, loading }: Props) {


    const form = useForm({
        initialValues: {
            phone: '',
            fio: '',
            address: '',
        },
        validate: {
            phone: (value: string) => (value.length > 0 ? null : 'Невірний номер телефону'),
            fio: (value: string) => (value.length > 0 ? null : 'Поле не може бути порожнім'),
            address: (value: string) => (value.length > 0 ? null : 'Поле не може бути порожнім'),

        },
    });

    return (
        <Box sx={{ maxWidth: 300 }} mx="auto">
            <form onSubmit={form.onSubmit(onSubmit)}>
                <div className={styles.Form}>
                    <LoadingOverlay visible={loading} />
                    <NumberFormat customInput={TextInput} format="+38(###) ###-##-##"  {...form.getInputProps('phone')} required
                        label="Номер телефону"
                        placeholder="+38(999) 999-99-99" />
                    <TextInput
                        required
                        label="ФІО"
                        placeholder="Фамілія Ім'я По Батькові"
                        {...form.getInputProps('fio')}
                    />

                    <TextInput
                        required
                        label="Адреса,Номер віділення нової пошти"
                        placeholder="Адреса,Номер віділення нової пошти"
                        {...form.getInputProps('address')}
                    />

                    <Group position="center" mt="md">
                        <Button type="submit">Создать</Button>
                    </Group>                    
                </div>
            </form>
        </Box >
    )
}