//go:build no_runtime_type_checking

package p6cdknamer

// Building without runtime type checking enabled, so all the below just return nil

func (p *jsiiProxy_P6Namer) validateApplyRemovalPolicyParameters(policy awscdk.RemovalPolicy) error {
	return nil
}

func (p *jsiiProxy_P6Namer) validateGetResourceArnAttributeParameters(arnAttr *string, arnComponents *awscdk.ArnComponents) error {
	return nil
}

func (p *jsiiProxy_P6Namer) validateGetResourceNameAttributeParameters(nameAttr *string) error {
	return nil
}

func validateP6Namer_IsConstructParameters(x interface{}) error {
	return nil
}

func validateP6Namer_IsOwnedResourceParameters(construct constructs.IConstruct) error {
	return nil
}

func validateP6Namer_IsResourceParameters(construct constructs.IConstruct) error {
	return nil
}

func validateNewP6NamerParameters(scope constructs.Construct, id *string, props IP6NamerProps) error {
	return nil
}

