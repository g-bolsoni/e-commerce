import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';
import { toast } from 'react-toastify';

const newsletterSchema = z.object({
    email: z.string().email('Informe um e-mail válido!').min(3, 'Informe um e-mail válido!').max(255),
});

type INewsletterSchema = z.infer<typeof newsletterSchema>;

const Newsletter = () => {
    const { handleSubmit, register, formState: {errors}} = useForm({
        mode: 'all',
        criteriaMode: 'all',
        resolver: zodResolver(newsletterSchema),
        defaultValues: {
            email: '',
        },
    })

    const submitForm = (data: INewsletterSchema) => {
        console.log(data);
        if(data.email.length === 0){
            toast.error('Falha ao enviar o email!');
            return;
        }

        toast.success('Email cadastrado com sucesso!');
    }

    return (
        <section className='p-4 md:p-0 min-h-[300px] h-full w-full bg-white rounded-3xl my-6 flex items-center justify-center flex-col gap-6'>
            <div className='text-center flex flex-col gap-4'>
                <h2 className='text-zinc-800 text-lg md:text-3xl font-bold'>Receba nossas ofertas</h2>
                <span className='text-zinc-500 text-sm md:text-base'>Informe seu e-mail para sempre ficar por dentro das nossas ofertas e promoções</span>
            </div>
            <form onSubmit={handleSubmit(submitForm)} className='flex gap-2 md:gap-6'>
                <div className='relative'>
                    <input
                        type="email"
                        {...register('email')}
                        placeholder='Infome seu e-mail'
                        className='max-w-[360px] w-full h-10 px-4 border border-zinc-500 rounded-lg'
                    />
                    {errors.email && (
                        <p className='text-red-600 text-xs'> {errors.email.message} </p>
                    )}
                </div>
                <button type="submit" className='rounded-full h-10 px-4 flex items-center justify-center bg-green-800 text-white text-base'>Enviar</button>
            </form>
        </section>
    );

}

export default Newsletter;
