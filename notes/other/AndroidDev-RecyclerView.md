> ## RecyclerView
> ### 什么是RecyclerView?
> RecyclerView是ListView的改进版，它可以垂直滚动，水平滚动，还可以是格子，是一个装载着有限数量views的容器，是一种高效的可滚动视图。
> ### RecyclerView的目的在于
> 1. 减少在每次创建view时的调用findViewById()方法的高昂开销，即减少内存占用。这在一定程度上减少了电量的损耗。
> 2. 减少在创建view所花费的时间。

> ### RecyclerView涉及到的组件
> - Data：数据源，不论来源，本地也好，云端也好，假的也罢
> - A RecyclerView：包含list items的可滚动视图
> - Layout for one item of data：RecyclerView中的子项布局定义
> - A layout manager：布局管理器，每个ViewGroup都拥有一个布局管理器([RecyclerView.LayoutManager](https://developer.android.com/reference/android/support/v7/widget/RecyclerView.LayoutManager.html))，它管理着每一个子项的布局
> - An adapter：这里用到的是[RecyclerView.Adapter](https://developer.android.com/reference/android/support/v7/widget/RecyclerView.Adapter.html)将数据与RecyclerView相连接，负责准备数据，当数据发生变化时，它会即时更新视图
> - A view holder：每个ViewHolder([RecyclerView.ViewHolder](https://developer.android.com/reference/android/support/v7/widget/RecyclerView.ViewHolder.html))持有着一个item view的信息

> ### RecyclerView工作原理
> ![image](https://raw.githubusercontent.com/lzjlxebr/Knowledge-reserve-for-my-app/master/images/RecyclerView%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86.png)

> ### RecyclerView使用基本步骤
> 拓展[RecyclerView.Adapter](https://developer.android.com/reference/android/support/v7/widget/RecyclerView.Adapter.html)抽象类，泛型指定为ViewHolder类型，并覆盖onCreateViewHolder(),onBindViewHolder(),getItemCount()三个基本方法
```
public class MyRecyclerViewAdapter extends RecyclerView.Adapter<MyRecyclerView.MyViewHolder> {
     /*    ViewHolders on screen:
     *
     *        *-----------------------------*
     *        |         ViewHolder index: 0 |
     *        *-----------------------------*
     *        |         ViewHolder index: 1 |
     *        *-----------------------------*
     *        |         ViewHolder index: 2 |
     *        *-----------------------------*
     *        |         ViewHolder index: 3 |
     *        *-----------------------------*
     *        |         ViewHolder index: 4 |
     *        *-----------------------------*
     *        |         ViewHolder index: 5 |
     *        *-----------------------------*
     *        |         ViewHolder index: 6 |
     *        *-----------------------------*
     *        |         ViewHolder index: 7 |
     *        *-----------------------------*
     *
     *    Extra ViewHolders (off screen)
     *
     *        *-----------------------------*
     *        |         ViewHolder index: 8 |
     *        *-----------------------------*
     *        |         ViewHolder index: 9 |
     *        *-----------------------------*
     *        |         ViewHolder index: 10|
     *        *-----------------------------*
     *        |         ViewHolder index: 11|
     *        *-----------------------------*
     *
     *    Total number of ViewHolders = 11
     */
    private static int viewHolderCount;
    
    public MyRecyclerViewAdapter() {
        this.viewHolderCount = viewHolderCount;
    }

    @Override
    public MyRecyclerView.MyViewHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {
        // 被持有的ListItemViewId
        int itemIdShouldBeHold = R.layout.list_item;
        // 是否立即与其父视图匹配布局参数
        boolean shouldAttachToParentImmediately = false;
        // 在ViewGroup中撑张一个ListItemView
        View listItemView = LayoutInflate.from(viewGroup.getContext())
            .inflate(itemIdShouldBeHold, viewGroup, shouldAttachToParentImmediately);
        //
        MyViewHolder viewHolder = new MyViewHolder(view);
        // 将viewHolderIndex赋值
        viewHolderIndex.setText("ViewHolder index: " + viewHolderCount ++)
        
        return viewHolder;
    }
    @Override
    public void onBindViewHolder(MyViewHolder viewHolder, int position) {
        viewHolder.bind(position);
    }
    @Override
    public int getItemCount() {
        return 100; // should be a variable
    }
  
    class MyViewHolder extends RecyclerView.ViewHolder {
        // ViewHolder将持有的ListItemView中的一个TextView，这里用于显示item的编号
        private TextView listItemView;
        // ViewHolder将持有的ListItemView中的另一个TextView，这里用于显示ViewHolder的编号
        private TextVIew viewHolderIndex;
      
        public MyViewHolder(View itemView) {
            super(itemView);
            listItemView = (TextView) itemView.findViewById(R.id.tv_item_number);
            viewHolderIndex = (TextView) itemView.findViewById(R.id.tv_view_holder_index);
        }
        void bind(int listIndex) {
            listItemView.setText(String.valueOf(listIndex));
        }
    }
}
```
> 以下是对应的xml布局文件
```
<!-- activity_main.xml -->
<FrameLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <android.support.v7.widget.RecyclerView
        android:id="@+id/rv_numbers"
        android:layout_width="match_parent"
        android:layout_height="match_parent"/>
</FrameLayout>
<!-- list_item.xml -->
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:padding="16dp">

    <TextView
        android:id="@+id/tv_item_number"
        style="@style/TextAppearance.AppCompat.Title"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center_vertical|start"
        android:fontFamily="monospace"
        android:textSize="42sp"
        tools:text="#42" />

    <TextView
        android:id="@+id/tv_view_holder_index"
        style="@style/TextAppearance.AppCompat.Title"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center_vertical|end"
        android:fontFamily="monospace"
        android:textColor="#000"
        tools:text="ViewHolder index: 7" />
</FrameLayout>
```
> 最后一步，在Activity中使用LayoutManager将前面的组件整合起来
```
...
private MyRecyclerViewAdapter mAdpter;
private RecyclerView mNumberList;

@Override
protected void onCreate(Bundle saveInstanceState) {
    super.onCreate(saveInstanceState);
    setContentView(R.layout.activity_main);
    
    mNumberList = (RecyclerView) findViewById(R.id.rv_numbers);
    
    LayoutManager mManager = new LinearLayoutManager(this);
    mNumberList.setLayoutManager(mManager);
    
    // 提高显示性能
    mNumberList.setHasFixedSize(true);
    
    mAdapter = new MyRecyclerViewAdapter(mNumberList);
    
    mNumberList.setAdapter(mAdapter);
}
...
```
> RecyclerView有个特点，getChildAt()是获取动态的id值，也就意味着，页面中的可见内容是随时被其维护的，不是固定的。
> RecyclerView的Decoration会一直监听手势，recyclerview的可见内容一旦变化，onDraw或者onDrawOver方法就会一直被调用，也就是会一直绘制视图
