import Form from '@/components/Form/Form';
import Table from '@/components/Table/Table';
import Welcome from '@/components/Welcome';
import useMatrixContext from '@/hooks/useMatrixContext';

function App() {
	const { tableParams } = useMatrixContext();

	return (
		<main className='container mx-auto min-h-screen'>
			<Welcome />
			{tableParams ? <Table /> : <Form />}
		</main>
	);
}

export default App;
