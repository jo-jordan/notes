startActivityForResult(in Activity or Fragment)
onActivityResult(in Activity or Fragment)

If you want ovreride onAvtivityResult in fragment your mainActivity must override this method,
And your fragment start other activity must use startActivityForResult method directly.
Then you can get the result from other activity by fragment
