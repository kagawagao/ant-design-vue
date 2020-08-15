<script>
import Button from '../components/button';
import Space from '../components/space';
import '../components/button/style';
import '../components/space/style';
export default {
  data() {
    return {
      visible: true,
      current: ['mail'],
    };
  },
  render() {
    return (
      <Space size="small">
        <Button>1234</Button>
        <Button>43</Button>
      </Space>
    );
  },
};
</script>
