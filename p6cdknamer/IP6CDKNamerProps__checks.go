//go:build !no_runtime_type_checking

package p6cdknamer

import (
	"fmt"
)

func (j *jsiiProxy_IP6CDKNamerProps) validateSetAccountAliasParameters(val *string) error {
	if val == nil {
		return fmt.Errorf("parameter val is required, but nil was provided")
	}

	return nil
}

