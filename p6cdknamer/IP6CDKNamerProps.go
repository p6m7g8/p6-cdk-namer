package p6cdknamer

import (
	_jsii_ "github.com/aws/jsii-runtime-go/runtime"
)

type IP6CDKNamerProps interface {
	AccountAlias() *string
	SetAccountAlias(a *string)
}

// The jsii proxy for IP6CDKNamerProps
type jsiiProxy_IP6CDKNamerProps struct {
	_ byte // padding
}

func (j *jsiiProxy_IP6CDKNamerProps) AccountAlias() *string {
	var returns *string
	_jsii_.Get(
		j,
		"accountAlias",
		&returns,
	)
	return returns
}

func (j *jsiiProxy_IP6CDKNamerProps)SetAccountAlias(val *string) {
	if err := j.validateSetAccountAliasParameters(val); err != nil {
		panic(err)
	}
	_jsii_.Set(
		j,
		"accountAlias",
		val,
	)
}

