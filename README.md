# Lasia-start

Lasia Start 是模仿 Terminal 风格起始页，你可以通过命令行的方式去进行你想要的操作。

当前版本 v1.0.0

## 搜索功能

```shell
$ sia search ${keywords}
```

使用此指令可以进行搜索，此指令有三个参数，分别为 `--bing`，`--google`，`--baidu` 。这三种参数功能为指定你要进行搜索的搜索引擎。若没有指定搜索引擎，将会采用在 `Conf` 中设定的默认搜索引擎，如果此项未设置，则默认采用 Bing 搜索。

## 输出功能

```shell
$ sia echo ${value}
```

此指令会将 `${value}` 的值返回。此指令有两个参数，分别为 `--time`，`--conf`。

`--time` 参数不接受值，直接调用即可，此参数会返回当前的时间。

```shell
$ sia echo --time
# output: Sat Sep 16 2023 14:49:57 GMT+0800 (中国标准时间)
```

`--conf` 参数接受一个值，该值为 `Conf` 中的参数名称，用于输出此参数的值。

```shell
$ sia echo --conf user
# output: Lasia
```

## 基本配置

```shell
$ sia conf
```

此指令不接受值，此指令有五个参数，分别为 `--user`，`--engine`，`--location`，`--del`，`--clear`。当该指令没有携带参数时，将会输出 `Conf` 中所有的项名称，说明和值。

`--user`，`--engine`，`--location` 都接受一个值并将该值赋予对应的项。`--user` 表示当前的用户名，`--location` 表示用户设置的地址，`--engine` 表示用户设置的默认搜索引擎。

```shell
$ sia echo --conf user
# output: undefined
$ sia conf --user Lasia
$ sia echo --conf user
# output: Lasia
```

`--del` 和 `--clear` 都是用于删除 `Conf` 中的值，区别在于 `--del` 接受一个值用于指定要删除的项，而 `--clear` 不接受值，其作用为删除所有的值。

## 指令列表

```shell
$ sia list
```

此指令不接受值，此指令也没有参数，此指令的功能为输出所有可用的指令及其说明。

## 指令帮助

```shell
$ sia help ${value}
```

此指令必须接受一个值，用于指明目标指令，此指令用于显示一个指令的功能及其参数，并对参数加以说明。
