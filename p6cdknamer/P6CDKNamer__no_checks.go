//go:build no_runtime_type_checking

package p6cdknamer

// Building without runtime type checking enabled, so all the below just return nil

func (p *jsiiProxy_P6CDKNamer) validateApplyRemovalPolicyParameters(policy awscdk.RemovalPolicy) error {
	return nil
}

func (p *jsiiProxy_P6CDKNamer) validateGetResourceArnAttributeParameters(arnAttr *string, arnComponents *awscdk.ArnComponents) error {
	return nil
}

func (p *jsiiProxy_P6CDKNamer) validateGetResourceNameAttributeParameters(nameAttr *string) error {
	return nil
}

func validateP6CDKNamer_IsConstructParameters(x interface{}) error {
	return nil
}

func validateP6CDKNamer_IsOwnedResourceParameters(construct constructs.IConstruct) error {
	return nil
}

func validateP6CDKNamer_IsResourceParameters(construct constructs.IConstruct) error {
	return nil
}

func validateNewP6CDKNamerParameters(scope constructs.Construct, id *string, props IP6CDKNamerProps) error {
	return nil
}

