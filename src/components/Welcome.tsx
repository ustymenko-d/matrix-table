const Welcome = () => (
	<section className='mb-12 px-4 pt-12'>
		<div className='flex max-w-xl flex-col gap-2'>
			<h1 className='mb-2 text-4xl font-bold text-foreground'>
				Welcome to Matrix{'\u00A0'}Table
			</h1>

			<p className='text-lg text-foreground'>
				This application allows you to manage and interact with structured
				tabular data.
			</p>

			<p className='text-base text-muted-foreground'>
				To get started, please fill out the form below.
			</p>
		</div>
	</section>
);

export default Welcome;
